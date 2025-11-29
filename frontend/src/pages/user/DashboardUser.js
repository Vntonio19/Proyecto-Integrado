import React from "react";
import "../../Styles/user/UserDashboard.css";

export default function DashboardUser() {
  return (
    <div className="dashboard-user">

      <div className="dashboard-header">
        <h1>Panel de Usuario</h1>
        <p>Bienvenido a tu espacio personal dentro del sistema</p>
      </div>

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <div className="card-icon">📅</div>
          <h3>Mis Reservas</h3>
          <p>Consulta y administra tus reservas activas.</p>
          <button onClick={() => (window.location.href = "/user/reservas")}>
            Ver Reservas
          </button>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📍</div>
          <h3>Espacios Disponibles</h3>
          <p>Explora los espacios que puedes utilizar.</p>
          <button onClick={() => (window.location.href = "/user/espacios")}>
            Ver Espacios
          </button>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">🔔</div>
          <h3>Notificaciones</h3>
          <p>Últimas novedades y avisos del sistema.</p>
          <button onClick={() => (window.location.href = "/user/notificaciones")}>
            Ver Notificaciones
          </button>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">👤</div>
          <h3>Mi Perfil</h3>
          <p>Revisa y administra tu información personal.</p>
          <button onClick={() => (window.location.href = "/user/perfil")}>
            Ver Perfil
          </button>
        </div>

      </div>
    </div>
  );
}
