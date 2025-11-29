import React, { useEffect, useState } from "react";
import "../../Styles/user/UserTables.css";

export default function NotificacionesList() {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    setNotificaciones([
      {
        id: 1,
        mensaje: "Tu reserva en Lab 301 fue aprobada.",
        fecha: "2025-11-10",
      },
      {
        id: 2,
        mensaje: "Nueva actualización en el sistema.",
        fecha: "2025-11-12",
      },
    ]);
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">Notificaciones</h1>

      <div className="card-table">
        <table>
          <thead>
            <tr>
              <th>Mensaje</th>
              <th>Fecha</th>
            </tr>
          </thead>

          <tbody>
            {notificaciones.map((n) => (
              <tr key={n.id}>
                <td>{n.mensaje}</td>
                <td>{n.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
