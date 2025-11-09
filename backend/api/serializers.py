from rest_framework import serializers
from .models import Espacio, Reserva, Notificacion
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class EspacioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Espacio
        fields = '__all__'

class ReservaSerializer(serializers.ModelSerializer):
    usuario = UserSerializer(read_only=True)
    espacio = EspacioSerializer(read_only=True)

    usuario_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='usuario', write_only=True)
    espacio_id = serializers.PrimaryKeyRelatedField(queryset=Espacio.objects.all(), source='espacio', write_only=True)

    class Meta:
        model = Reserva
        fields = ['id', 'usuario', 'espacio', 'usuario_id', 'espacio_id', 'fecha', 'hora_inicio', 'hora_fin', 'estado']

class NotificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notificacion
        fields = '__all__'
