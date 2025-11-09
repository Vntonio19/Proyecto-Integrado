from django.db import models
from django.contrib.auth.models import User

# ======= MODELO DE ESPACIOS =======
class Espacio(models.Model):
    nombre = models.CharField(max_length=100)
    tipo = models.CharField(max_length=100)
    capacidad = models.IntegerField()
    ubicacion = models.CharField(max_length=200)
    estado = models.CharField(max_length=20, default='Disponible')

    def __str__(self):
        return self.nombre


# ======= MODELO DE RESERVAS =======
class Reserva(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reservas')
    espacio = models.ForeignKey(Espacio, on_delete=models.CASCADE, related_name='reservas')
    fecha = models.DateField()
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()
    estado = models.CharField(max_length=20, default='Pendiente')

    def __str__(self):
        return f"{self.usuario.username} - {self.espacio.nombre} ({self.fecha})"


# ======= MODELO DE NOTIFICACIONES =======
class Notificacion(models.Model):
    mensaje = models.TextField()
    fecha_envio = models.DateTimeField(auto_now_add=True)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notificaciones', null=True, blank=True)

    def __str__(self):
        return self.mensaje[:50]
