from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

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


# ======= PERFIL DE USUARIO =======
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    avatar = models.ImageField(upload_to="avatars/", null=True, blank=True)
    facultad = models.CharField(max_length=200, blank=True, default="Ingeniería")
    departamento = models.CharField(max_length=200, blank=True, default="Sistemas")
    telefono = models.CharField(max_length=20, blank=True)
    fecha_nacimiento = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"Perfil de {self.user.username}"


# ======= CREAR PERFIL AUTOMÁTICO =======
@receiver(post_save, sender=User)
def crear_perfil(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


# ======= MODELO DE TAREAS DE ASEO =======
class TareaAseo(models.Model):
    descripcion = models.CharField(max_length=255)
    fecha_programada = models.DateField()
    completada = models.BooleanField(default=False)

    def __str__(self):
        return self.descripcion 
    
#------- RERSERVAS Y ESPACIOS -------#
class Reserva(models.Model):
    sala = models.ForeignKey(Sala, on_delete=models.CASCADE)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    fecha = models.DateField()
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()
    estado = models.CharField(max_length=20)
    estado_limpieza = models.CharField(max_length=20, default="PENDIENTE")
    requiere_aseo = models.BooleanField(default=True)
