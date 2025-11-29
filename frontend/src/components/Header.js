import React from "react";
import "../Styles/user/Header.css";

export default function Header() {
  const username = localStorage.getItem("username") || "Usuario";
  const role =
    localStorage.getItem("role") === "admin" ? "Administrador" : "Usuario";

  return (
    <header className="top-header">
      <div className="header-left">
        {/* Se deja vacío para mantener estructura simétrica */}
      </div>

      <div className="header-right">
        <div className="header-user">
          <span className="header-name">{username}</span>
          <span className="header-role">{role}</span>
        </div>

        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="perfil"
          className="header-avatar"
        />

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
