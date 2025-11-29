import React from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/admin/DashboardAdminHome.css";

export default function DashboardAdminHome() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-admin">

      <h1>Configuración del Sistema</h1>
      <p className="subtitle">Administrador</p>

      <div className="system-options">

        {/* Gestión de Usuarios */}
        <div className="option-card">
          <div className="icon">👥</div>
          <h3>Gestión de Usuarios</h3>
          <p>Administra usuarios, roles y permisos.</p>
          <button className="btn" onClick={() => navigate("/admin/usuarios")}>
            Gestionar
          </button>
        </div>

        {/* Opciones del Sistema */}
        <div className="option-card">
          <div className="icon">💻</div>
          <h3>Opciones del Sistema</h3>
          <p>Configura horarios, límites y parámetros globales.</p>
          <button className="btn" onClick={() => navigate("/admin/opciones")}>
            Configurar
          </button>
        </div>

        {/* Reportes */}
        <div className="option-card">
          <div className="icon">📊</div>
          <h3>Reportes y Estadísticas</h3>
          <p>Consulta reportes del sistema.</p>
          <button className="btn" onClick={() => navigate("/admin/reportes")}>
            Ver reportes
          </button>
        </div>

        {/* Seguridad */}
        <div className="option-card">
          <div className="icon">🔒</div>
          <h3>Seguridad</h3>
          <p>Configura accesos y políticas de seguridad.</p>
          <button className="btn" onClick={() => navigate("/admin/seguridad")}>
            Configurar
          </button>
        </div>

      </div>
    </div>
  );
}
