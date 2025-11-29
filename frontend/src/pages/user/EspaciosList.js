import React, { useEffect, useState } from "react";
import "../../Styles/user/UserTables.css";

export default function EspaciosList() {
  const [espacios, setEspacios] = useState([]);

  useEffect(() => {
    // 🔥 Aquí conectas tu API real cuando esté lista
    setEspacios([
      { id: 1, nombre: "Laboratorio 301", capacidad: 25, tipo: "Sala" },
      { id: 2, nombre: "Auditorio 1", capacidad: 120, tipo: "Auditorio" },
      { id: 3, nombre: "Cancha Indoor", capacidad: 30, tipo: "Deporte" },
    ]);
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">Espacios Disponibles</h1>

      <div className="card-table">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Capacidad</th>
              <th>Tipo</th>
            </tr>
          </thead>

          <tbody>
            {espacios.map((e) => (
              <tr key={e.id}>
                <td>{e.nombre}</td>
                <td>{e.capacidad}</td>
                <td>{e.tipo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
