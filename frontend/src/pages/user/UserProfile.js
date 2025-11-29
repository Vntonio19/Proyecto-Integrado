import React, { useEffect, useState } from "react";
import "../../Styles/user/UserProfile.css";

export default function UserProfile() {
  const [user, setUser] = useState({
    nombre: "",
    email: "",
    rol: "",
    carrera: "",
    rut: "",
    fecha: "—",
  });

  useEffect(() => {
    const username = localStorage.getItem("username") || "Usuario";
    const role = localStorage.getItem("role") || "user";

    setUser((prev) => ({
      ...prev,
      nombre: username,
      email: `${username}@inacapmail.cl`,
      rol: role === "admin" ? "Administrador" : "Usuario",
      carrera: "Ingeniería en Informática",
      rut: "—",
    }));
  }, []);

  return (
    <div className="user-profile-container">
      <h1 className="profile-title">Mi Perfil</h1>

      <div className="profile-card">

        {/* FOTO + INFO PRINCIPAL */}
        <div className="profile-left">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            className="profile-photo"
            alt="Usuario"
          />

          <h2>{user.nombre}</h2>
          <p className="role">{user.rol}</p>
        </div>

        {/* DATOS */}
        <div className="profile-right">

          <div className="input-group">
            <label>Nombre Completo</label>
            <input type="text" value={user.nombre} readOnly />
          </div>

          <div className="input-group">
            <label>Correo Electrónico</label>
            <input type="text" value={user.email} readOnly />
          </div>

          <div className="input-group">
            <label>Carrera</label>
            <input type="text" value={user.carrera} readOnly />
          </div>

          <div className="input-group">
            <label>RUT</label>
            <input type="text" value={user.rut} readOnly />
          </div>

          <div className="input-group">
            <label>Fecha de Registro</label>
            <input type="text" value={user.fecha} readOnly />
          </div>

          {/* BOTONES */}
          <div className="profile-actions">
            <button className="btn-edit">Editar Perfil</button>
            <button className="btn-password">Cambiar Contraseña</button>
          </div>

        </div>
      </div>
    </div>
  );
}
