import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../Styles/user/UserSidebar.css";
import {
  Home,
  Calendar,
  Map,
  Bell,
  User,
  LogOut,
} from "lucide-react";

export default function UserSidebar() {
  const location = useLocation();
  const active = (path) => (location.pathname === path ? "active" : "");

  return (
    <aside className="user-sidebar">
      <div className="user-sidebar-header">
        <div className="logo-circle">U</div>
        <h3>Panel Usuario</h3>
        <p>Gestión Personal</p>
      </div>

      <nav className="user-sidebar-menu">
        <ul>
          <li className={active("/user/home")}>
            <Link to="/user/home">
              <Home size={20} />
              <span>Inicio</span>
            </Link>
          </li>

          <li className={active("/user/reservas")}>
            <Link to="/user/reservas">
              <Calendar size={20} />
              <span>Mis Reservas</span>
            </Link>
          </li>

          <li className={active("/user/espacios")}>
            <Link to="/user/espacios">
              <Map size={20} />
              <span>Espacios</span>
            </Link>
          </li>

          <li className={active("/user/notificaciones")}>
            <Link to="/user/notificaciones">
              <Bell size={20} />
              <span>Notificaciones</span>
            </Link>
          </li>

          <li className={active("/user/perfil")}>
            <Link to="/user/perfil">
              <User size={20} />
              <span>Mi Perfil</span>
            </Link>
          </li>

        </ul>
      </nav>

      <button
        className="logout-btn"
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      >
        <LogOut size={20} />
        Cerrar Sesión
      </button>

      <footer className="user-sidebar-footer">
        <p>Sistema de Reservas</p>
        <span>v1.0</span>
      </footer>
    </aside>
  );
}
