import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaHome,
  FaChartLine,
  FaUsersCog,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import Swal from "sweetalert2";
import "../Styles/admin/Navbar.css";

export default function Navbar({ logout }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({ nombre: "", rol: "" });

  useEffect(() => {
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    setUser({
      nombre: username || "Usuario",
      rol: role === "admin" ? "Administrador" : "Usuario",
    });
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Tu sesión será cerrada.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#b30000",
      cancelButtonColor: "#777",
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        if (logout) logout();
        navigate("/");  // <-- ruta correcta del login
      }
    });
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-profile">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="Admin"
          className="admin-avatar"
        />
        <h4>{user.nombre}</h4>
        <p>{user.rol}</p>
      </div>

        <nav className="admin-menu">
          <ul>
            <li onClick={() => navigate("/admin/home")}>
              <FaHome /> <span>Home</span>
            </li>

            <li onClick={() => navigate("/admin/usuarios")}>
              <FaUsersCog /> <span>Gestión de Usuarios</span>
            </li>

            <li onClick={() => navigate("/admin/opciones")}>
              <FaCog /> <span>Opciones de Sistema</span>
            </li>

            <li onClick={() => navigate("/admin/reportes")}>
              <FaChartLine /> <span>Reportes</span>
            </li>

            <li onClick={() => navigate("/admin/seguridad")}>
              <FaUserCircle /> <span>Seguridad</span>
            </li>

            <li onClick={() => navigate("/admin/perfil")}>
              <FaUserCircle /> <span>Mi Perfil</span>
            </li>
          </ul>
        </nav>

      <div className="admin-footer">
        <button className="admin-logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
