import React from 'react';
import "./Static/DashboardUser.css";

export default function DashboardUser({ logout }) {
  return (
    <div className="dashboard">
      <div className="header">
        <h2>Bienvenido al Sistema de Reservas</h2>
        <button className="logout-btn" onClick={logout}>Salir</button>
      </div>
      <div className="cards">
        <div className="card rojo">Ver Espacios</div>
        <div className="card gris">Mis Reservas</div>
        <div className="card claro">Notificaciones</div>
      </div>
    </div>
  );
}

