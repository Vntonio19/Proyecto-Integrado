import React, { useState } from "react";
import axios from "axios";
import "../Styles/user/Login.css"; // <-- Import correcto
import logo from "../imagenes/logoinacap.png";
import fondo from "../imagenes/campus.png";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", {
        username,
        password,
      });

      // === GUARDAR SESIÓN ===
      localStorage.setItem("token", res.data.access);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("role", res.data.role);

      // === ACTUALIZAR ESTADO GLOBAL ===
      onLogin({ logged: true, role: res.data.role });
      
    } catch (err) {
      console.error("Error en login:", err);
      setError("Credenciales incorrectas.");
    }
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="login-form">
        <img src={logo} alt="Logo INACAP" className="login-logo" />

        <h3>Ingresa tu cuenta INACAPMail o tu RUT:</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="usuario@inacapmail.cl o RUT"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="remember">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Mantener la sesión iniciada</label>
          </div>

          <button type="submit" className="login-btn">
            Iniciar sesión
          </button>

          {error && <p className="error">{error}</p>}
        </form>

        <p className="recover">
          Recuperar clave. <a href="#">Click aquí.</a>
        </p>
      </div>
    </div>
  );
}
