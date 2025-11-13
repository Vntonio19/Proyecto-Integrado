import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// ===== Componentes Generales =====
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Login from "./components/Login";

// ===== Panel Usuario =====
import DashboardUser from "./components/DashboardUser";
import Espacios from "./components/EspaciosList";
import Reservas from "./components/ReservasList";
import Notificaciones from "./components/NotificacionesList";

// ===== Panel Administrador =====
import DashboardAdminHome from "./components/DashboardAdminHome";
import DashboardAdminProfile from "./components/DashboardAdmin";

import "./App.css";

function App() {
  const [user, setUser] = useState({ logged: false, role: null });

  // ✅ Detectar sesión guardada en localStorage al iniciar
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      setUser({ logged: true, role });
    }
  }, []);

  // ✅ Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    setUser({ logged: false, role: null });
  };

  return (
    <Router>
      {/* 🔹 Si NO está logeado → mostrar Login */}
      {!user.logged ? (
        <Login onLogin={setUser} />

      ) : user.role === "admin" ? (
        /* 🔸 Panel de ADMINISTRADOR */
        <Routes>
          {/* Home principal del admin */}
          <Route path="/admin/home" element={<DashboardAdminHome logout={handleLogout} />} />
          
          {/* Perfil del admin */}
          <Route path="/admin/perfil" element={<DashboardAdminProfile logout={handleLogout} />} />

          {/* Redirección si la ruta no existe */}
          <Route path="*" element={<Navigate to="/admin/home" />} />
        </Routes>

      ) : (
        /* 🔸 Panel de USUARIO NORMAL */
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <Header logout={handleLogout} />
            <Routes>
              <Route path="/" element={<DashboardUser />} />
              <Route path="/espacios" element={<Espacios />} />
              <Route path="/reservas" element={<Reservas />} />
              <Route path="/notificaciones" element={<Notificaciones />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
