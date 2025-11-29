from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    EspacioViewSet,
    ReservaViewSet,
    NotificacionViewSet,
    login_user,
    perfil_usuario,
    actualizar_perfil,
    cambiar_contrasena,
)

router = DefaultRouter()
router.register(r'espacios', EspacioViewSet)
router.register(r'reservas', ReservaViewSet)
router.register(r'notificaciones', NotificacionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', login_user, name='login_user'),
    path('perfil/', perfil_usuario, name='perfil_usuario'),
    path('perfil/actualizar/', actualizar_perfil, name='actualizar_perfil'),
    path('perfil/cambiar-password/', cambiar_contrasena, name='cambiar_contrasena'),
]
