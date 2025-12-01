from django.contrib import admin
from django.urls import path, include
from backend.api.views import TareasAseoView

# === IMPORTS NECESARIOS PARA MEDIA ===
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path("aseo/tareas/", TareasAseoView.as_view()),
    path("aseo/tareas/<int:tarea_id>/", TareasAseoView.as_view()),
]

# === SERVIR ARCHIVOS MEDIA EN DESARROLLO ===
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
