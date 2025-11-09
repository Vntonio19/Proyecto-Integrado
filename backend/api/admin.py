from django.contrib import admin
from django.utils.html import format_html
from .models import Espacio, Reserva, Notificacion

# ====== ESPACIOS ======
@admin.register(Espacio)
class EspacioAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'tipo', 'capacidad', 'ubicacion', 'estado_coloreado')
    list_filter = ('tipo', 'estado')
    search_fields = ('nombre', 'ubicacion')
    list_per_page = 10

    def estado_coloreado(self, obj):
        color = {
            'Disponible': 'green',
            'Ocupado': 'red',
            'Mantenimiento': 'orange'
        }.get(obj.estado, 'gray')
        return format_html(f'<b style="color:{color}">{obj.estado}</b>')

    estado_coloreado.short_description = 'Estado'


# ====== RESERVAS ======
@admin.register(Reserva)
class ReservaAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'espacio', 'fecha', 'hora_inicio', 'hora_fin', 'estado_coloreado')
    list_filter = ('estado', 'fecha')
    search_fields = ('usuario__username', 'espacio__nombre')
    list_per_page = 10
    actions = ['aprobar_reservas', 'rechazar_reservas']

    def estado_coloreado(self, obj):
        color = {
            'Pendiente': 'orange',
            'Aprobada': 'green',
            'Rechazada': 'red'
        }.get(obj.estado, 'gray')
        return format_html(f'<b style="color:{color}">{obj.estado}</b>')

    estado_coloreado.short_description = 'Estado'

    # Acciones personalizadas
    def aprobar_reservas(self, request, queryset):
        updated = queryset.update(estado='Aprobada')
        self.message_user(request, f"{updated} reserva(s) aprobada(s).")
    aprobar_reservas.short_description = "✅ Aprobar reservas seleccionadas"

    def rechazar_reservas(self, request, queryset):
        updated = queryset.update(estado='Rechazada')
        self.message_user(request, f"{updated} reserva(s) rechazada(s).")
    rechazar_reservas.short_description = "❌ Rechazar reservas seleccionadas"


# ====== NOTIFICACIONES ======
@admin.register(Notificacion)
class NotificacionAdmin(admin.ModelAdmin):
    list_display = ('mensaje', 'fecha_envio', 'usuario')
    list_filter = ('fecha_envio',)
    search_fields = ('mensaje', 'usuario__username')
    readonly_fields = ('fecha_envio',)
