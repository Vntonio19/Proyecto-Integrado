import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaChartLine,
  FaUsersCog,
  FaUserCircle,
  FaSignOutAlt,
  FaCog,
} from "react-icons/fa";
import Swal from "sweetalert2"; // 🔥 Importa SweetAlert2
import "./Static/Navbar.css";

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

  // ✅ SweetAlert2 para cerrar sesión
  const handleLogout = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Tu sesión se cerrará y volverás al inicio de sesión.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#b50000",
      cancelButtonColor: "#777",
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
      background: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        logout();
        navigate("/login");
        Swal.fire({
          title: "Sesión cerrada",
          text: "Has cerrado sesión correctamente.",
          icon: "success",
          confirmButtonColor: "#b50000",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <aside className="sidebar">
      {/* Perfil superior */}
      <div className="sidebar-profile">
        <img
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          alt="Admin"
          className="sidebar-avatar"
        />
        <h4>{user.nombre}</h4>
        <p>{user.rol}</p>
      </div>

      {/* Menú principal */}
      <nav className="sidebar-menu">
        <ul>
          <li onClick={() => navigate("/admin/home")}>
            <FaHome /> <span>Home</span>
          </li>
          <li onClick={() => navigate("/reservas")}>
            <FaCalendarAlt /> <span>Reservas</span>
          </li>
          <li onClick={() => navigate("/opciones")}>
            <FaCog /> <span>Opciones de Sistema</span>
          </li>
          <li onClick={() => navigate("/reportes")}>
            <FaChartLine /> <span>Reportes / Estadísticas</span>
          </li>
          <li onClick={() => navigate("/usuarios")}>
            <FaUsersCog /> <span>Gestión de Usuarios</span>
          </li>
          <li onClick={() => navigate("/admin/perfil")}>
            <FaUserCircle /> <span>Mi Perfil</span>
          </li>
        </ul>
      </nav>

      {/* 🔻 Pie del sidebar con botones visibles */}
      <div className="sidebar-footer">
        <button className="config-btn">
          <FaCog /> Configuración
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
