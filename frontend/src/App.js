import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// ===== LOGIN =====
import Login from "./components/Login";

// ===== LAYOUTS =====
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";

// ===== PAGES ADMIN =====
import DashboardAdminHome from "./pages/admin/DashboardAdminHome";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
// Páginas del Admin
import GestionUsuarios from "./pages/admin/GestionUsuarios";
import OpcionesSistema from "./pages/admin/OpcionesSistema";
import Reportes from "./pages/admin/Reportes";
import Seguridad from "./pages/admin/Seguridad";
import UserProfileAdmin from "./pages/admin/UserProfileAdmin";

// ===== PAGES USER =====
import DashboardUser from "./pages/user/DashboardUser";
import UserProfile from "./pages/user/UserProfile";
import EspaciosList from "./pages/user/EspaciosList";
import ReservasList from "./pages/user/ReservasList";
import NotificacionesList from "./pages/user/NotificacionesList";

function App() {
  const [auth, setAuth] = useState({
    logged: false,
    role: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      setAuth({ logged: true, role });
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setAuth({ logged: false, role: null });
  };

  // ==========================
  // RUTAS NAVEGACIÓN
  // ==========================
  return (
    <Router>
      {!auth.logged ? (
        <Routes>
          <Route path="/" element={<Login onLogin={setAuth} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : auth.role === "admin" ? (
        // PANEL ADMIN
        <AdminLayout logout={logout}>
          <Routes>
            <Route path="/admin/home" element={<DashboardAdminHome />} />

            <Route path="/admin/usuarios" element={<GestionUsuarios />} />
            <Route path="/admin/opciones" element={<OpcionesSistema />} />
            <Route path="/admin/reportes" element={<Reportes />} />
            <Route path="/admin/seguridad" element={<Seguridad />} />
            <Route path="/admin/perfil" element={<UserProfileAdmin />} />

            <Route path="/admin/panel" element={<DashboardAdmin />} />

            <Route path="*" element={<Navigate to="/admin/home" />} />
          </Routes>
        </AdminLayout>
      ) : (
        // PANEL USUARIO NORMAL
        <UserLayout logout={logout}>
          <Routes>
            <Route path="/user/home" element={<DashboardUser />} />
            <Route path="/user/espacios" element={<EspaciosList />} />
            <Route path="/user/reservas" element={<ReservasList />} />
            <Route path="/user/notificaciones" element={<NotificacionesList />} />
            <Route path="/user/perfil" element={<UserProfile />} />

            <Route path="*" element={<Navigate to="/user/home" />} />
          </Routes>
        </UserLayout>
      )}
    </Router>
  );
}

export default App;
