import React from "react";
import AdminLayout from "./AdminLayout";
import "./Static/DashboardAdmin.css";

export default function DashboardAdminHome({ logout }) {
  return (
    <AdminLayout logout={logout}>
      <main className="admin-home">
        <h2>Configuración del Sistema</h2>
        <h4>Administrador</h4>

        <div className="system-options">
          <div className="option-card">
            <h3>👥 Gestión de Usuario</h3>
            <p>Administra los usuarios del sistema, sus roles y permisos.</p>
            <button className="btn">Gestionar</button>
          </div>

          <div className="option-card">
            <h3>💻 Opciones de Sistema</h3>
            <p>Configura horarios, permisos y parámetros del sistema.</p>
            <button className="btn">Configurar</button>
          </div>

          <div className="option-card">
            <h3>📊 Reportes y Estadísticas</h3>
            <p>Genera reportes y visualiza estadísticas de uso.</p>
            <button className="btn">Ver Reportes</button>
          </div>

          <div className="option-card">
            <h3>🔒 Seguridad</h3>
            <p>Configura políticas de seguridad y accesos.</p>
            <button className="btn">Configurar</button>
          </div>
        </div>
      </main>
    </AdminLayout>
  );
}
