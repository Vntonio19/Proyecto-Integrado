from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Espacio, Reserva, Notificacion
from .serializers import EspacioSerializer, ReservaSerializer, NotificacionSerializer

# ======= CRUD Espacios =======
class EspacioViewSet(viewsets.ModelViewSet):
    queryset = Espacio.objects.all().order_by('nombre')
    serializer_class = EspacioSerializer

    # ✅ Solo el admin puede crear, editar o eliminar
    def get_permissions(self):
        if self.action in ['create', 'update', 'destroy']:
            return [IsAdminUser()]
        return [AllowAny()]  # Todos pueden listar o ver

# ======= CRUD Reservas =======
class ReservaViewSet(viewsets.ModelViewSet):
    queryset = Reserva.objects.all().order_by('-fecha')
    serializer_class = ReservaSerializer
    permission_classes = [AllowAny]

# ======= CRUD Notificaciones =======
class NotificacionViewSet(viewsets.ModelViewSet):
    queryset = Notificacion.objects.all().order_by('-fecha_envio')
    serializer_class = NotificacionSerializer
    permission_classes = [AllowAny]

# ======= LOGIN JWT =======
@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    # Autenticar usuario
    user = authenticate(username=username, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'username': user.username,
            'role': 'admin' if user.is_staff else 'user'
        })
    else:
        return Response(
            {'error': 'Credenciales inválidas'},
            status=status.HTTP_401_UNAUTHORIZED
        )

# ======= PERFIL DE USUARIO (para DashboardAdmin) =======
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def perfil_usuario(request):
    user = request.user
    return Response({
        "username": user.username,
        "email": user.email,
        "role": "admin" if user.is_staff else "user",
        "first_name": user.first_name or "",
        "last_name": user.last_name or "",
        "facultad": "Ingeniería",
        "departamento": "Sistemas y Computación",
        "fecha_registro": user.date_joined.strftime("%d de %B, %Y"),
    })
