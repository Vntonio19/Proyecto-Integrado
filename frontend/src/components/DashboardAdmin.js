import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import "./Static/DashboardAdmin.css";

export default function DashboardAdminProfile({ logout }) {
  const [user, setUser] = useState({
    nombre: "",
    email: "",
    rol: "",
    facultad: "",
    departamento: "",
    fecha: "",
  });

  const navigate = useNavigate();

  // ✅ Cargar datos reales desde el backend usando JWT
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://127.0.0.1:8000/api/perfil/", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser({
            nombre: `${data.first_name || ""} ${data.last_name || ""}`.trim() || data.username,
            email: data.email || `${data.username}@inacapmail.cl`,
            rol: data.role || (data.is_staff ? "Administrador" : "Usuario"),
            facultad: "Ingeniería",
            departamento: "Sistemas y Computación",
            fecha: "20 de enero, 2020",
          });
        })
        .catch((error) => {
          console.error("Error al cargar perfil:", error);
          localStorage.clear();
          navigate("/");
        });
    }
  }, [navigate]);

  return (
    <AdminLayout logout={logout}>
      <main className="profile-section">
        <div className="profile-card">
          <div className="profile-header">
            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              alt="Usuario"
              className="profile-img"
            />
            <div>
              <h2>{user.nombre}</h2>
              <h4>{user.rol} - Ingeniería Civil en Informática</h4>
            </div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Logo-INACAP.svg"
              alt="Logo INACAP"
              className="inacap-logo"
            />
          </div>

          <div className="profile-data">
            <div className="field">
              <label>Nombre Completo</label>
              <input type="text" value={user.nombre} readOnly />
            </div>
            <div className="field">
              <label>Correo Electrónico</label>
              <input type="text" value={user.email} readOnly />
            </div>
            <div className="field">
              <label>Rol en el Sistema</label>
              <input type="text" value={user.rol} readOnly />
            </div>
            <div className="field">
              <label>Facultad</label>
              <input type="text" value={user.facultad} readOnly />
            </div>
            <div className="field">
              <label>Departamento</label>
              <input type="text" value={user.departamento} readOnly />
            </div>
            <div className="field">
              <label>Fecha de Registro</label>
              <input type="text" value={user.fecha} readOnly />
            </div>
          </div>

          <div className="profile-actions">
            <button className="btn-edit">Editar Perfil</button>
            <button className="btn-password">Cambiar Contraseña</button>
          </div>
        </div>
      </main>
    </AdminLayout>
  );
}
