import React, { useEffect, useState } from "react";
import "../../Styles/user/UserTables.css";

export default function ReservasList() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    // 🔥 Aquí conectarás tu API real
    setReservas([
      {
        id: 1,
        espacio: "Lab 301",
        fecha: "2025-11-20",
        hora: "14:00",
        estado: "Aprobada",
      },
      {
        id: 2,
        espacio: "Auditorio",
        fecha: "2025-11-22",
        hora: "10:00",
        estado: "Pendiente",
      },
    ]);
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">Mis Reservas</h1>

      <div className="card-table">
        <table>
          <thead>
            <tr>
              <th>Espacio</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {reservas.map((r) => (
              <tr key={r.id}>
                <td>{r.espacio}</td>
                <td>{r.fecha}</td>
                <td>{r.hora}</td>
                <td>
                  <span className={`estado estado-${r.estado.toLowerCase()}`}>
                    {r.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
