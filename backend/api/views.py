from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes, APIView
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.files.storage import default_storage


from .models import Espacio, Reserva, Notificacion
from .serializers import (
    EspacioSerializer,
    ReservaSerializer,
    NotificacionSerializer,
    UserProfileSerializer,
    TareaAseoSerializer,
)


# ==================== CRUD ESPACIOS ====================
class EspacioViewSet(viewsets.ModelViewSet):
    queryset = Espacio.objects.all().order_by('nombre')
    serializer_class = EspacioSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'destroy']:
            return [IsAdminUser()]
        return [AllowAny()]


# ==================== CRUD RESERVAS ====================
class ReservaViewSet(viewsets.ModelViewSet):
    queryset = Reserva.objects.all().order_by('-fecha')
    serializer_class = ReservaSerializer
    permission_classes = [AllowAny]


# ==================== CRUD NOTIFICACIONES ====================
class NotificacionViewSet(viewsets.ModelViewSet):
    queryset = Notificacion.objects.all().order_by('-fecha_envio')
    serializer_class = NotificacionSerializer
    permission_classes = [AllowAny]


# ==================== LOGIN JWT ====================
@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'username': user.username,
            'role': 'admin' if user.is_staff else 'user'
        })

    return Response({'error': 'Credenciales inválidas'}, status=401)


# ==================== PERFIL - OBTENER DATOS ====================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def perfil_usuario(request):
    user = request.user
    serializer = UserProfileSerializer(user)
    return Response(serializer.data)


# ==================== PERFIL - ACTUALIZAR ====================
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def actualizar_perfil(request):
    user = request.user
    data = request.data

    # --- Actualizar usuario ---
    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    user.first_name = data.get('first_name', user.first_name)
    user.last_name = data.get('last_name', user.last_name)
    user.save()

    # --- Actualizar perfil ---
    profile = user.profile

    profile.telefono = data.get('telefono', profile.telefono)
    profile.facultad = data.get('facultad', profile.facultad)
    profile.departamento = data.get('departamento', profile.departamento)

    # --- Fecha de nacimiento: validar y no romper ---
    fecha = data.get('fecha_nacimiento')
    if fecha and fecha not in ["null", "", "None"]:
        try:
            from datetime import datetime
            profile.fecha_nacimiento = datetime.strptime(fecha, "%Y-%m-%d").date()
        except:
            pass  # si viene mala, ignorar y no crashear

    # --- Avatar ---
    if 'avatar' in request.FILES:
        profile.avatar = request.FILES['avatar']

    profile.save()

    return Response({"message": "Perfil actualizado correctamente"})


# ==================== CAMBIAR CONTRASEÑA ====================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cambiar_contrasena(request):
    user = request.user
    old_password = request.data.get("old_password")
    new_password = request.data.get("new_password")

    if not user.check_password(old_password):
        return Response({"error": "La contraseña actual es incorrecta."}, status=400)

    user.set_password(new_password)
    user.save()

    return Response({"message": "Contraseña actualizada correctamente"})


# ==================== TAREAS DE ASEO ====================
class TareasAseoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        tareas = Reserva.objects.filter(
            estado="APROBADA",
            requiere_aseo=True,
            estado_limpieza="PENDIENTE"
        )

        serializer = TareaAseoSerializer(tareas, many=True)
        return Response(serializer.data)

    def patch(self, request, tarea_id):
        try:
            tarea = Reserva.objects.get(id=tarea_id)
            tarea.estado_limpieza = "COMPLETADA"
            tarea.save()
            return Response({"message": "Limpieza marcada como completada"})
        except Reserva.DoesNotExist:
            return Response({"error": "Tarea no encontrada"}, status=404)
