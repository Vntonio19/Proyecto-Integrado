from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Espacio, Reserva, Notificacion, Profile


# ======= USER SIMPLE =======
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


# ======= ESPACIOS =======
class EspacioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Espacio
        fields = '__all__'


# ======= RESERVAS =======
class ReservaSerializer(serializers.ModelSerializer):
    usuario = UserSerializer(read_only=True)
    espacio = EspacioSerializer(read_only=True)

    usuario_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='usuario',
        write_only=True
    )

    espacio_id = serializers.PrimaryKeyRelatedField(
        queryset=Espacio.objects.all(),
        source='espacio',
        write_only=True
    )

    class Meta:
        model = Reserva
        fields = [
            'id', 'usuario', 'espacio', 'usuario_id', 'espacio_id',
            'fecha', 'hora_inicio', 'hora_fin', 'estado'
        ]


# ======= NOTIFICACIONES =======
class NotificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notificacion
        fields = '__all__'


# ======= PROFILE =======
class ProfileSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['avatar', 'telefono', 'facultad', 'departamento', 'fecha_nacimiento']

    def get_avatar(self, obj):
        if obj.avatar:
            return obj.avatar.url  # <-- DEVUELVE URL COMPLETA
        return None


# ======= PERFIL COMPLETO PARA FRONTEND =======
class UserProfileSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile']

