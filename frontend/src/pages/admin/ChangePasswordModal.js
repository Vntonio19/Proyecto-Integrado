import React, { useState } from "react";
import "../../Styles/admin/ChangePasswordModal.css";

export default function ChangePasswordModal({ open, onClose }) {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const validate = () => {
    if (!oldPass || !newPass || !confirmPass)
      return setError("Todos los campos son obligatorios.");

    if (newPass.length < 6)
      return setError("La nueva contraseña debe tener mínimo 6 caracteres.");

    if (newPass !== confirmPass)
      return setError("Las contraseñas no coinciden.");

    setError("");
    alert("Contraseña actualizada exitosamente (falta backend).");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Cambiar Contraseña</h2>

        <label>Contraseña actual</label>
        <input
          type="password"
          value={oldPass}
          onChange={(e) => setOldPass(e.target.value)}
        />

        <label>Nueva contraseña</label>
        <input
          type="password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />

        <label>Confirmar nueva contraseña</label>
        <input
          type="password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <div className="modal-buttons">
          <button className="btn-rojo" onClick={validate}>
            Guardar
          </button>

          <button className="btn-gris" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
