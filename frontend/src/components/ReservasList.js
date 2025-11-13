import React, { useEffect, useState } from "react";
import { api } from "../api";

const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const [nueva, setNueva] = useState({ usuario: 1, espacio: 1, fecha: "", hora_inicio: "", hora_fin: "" });
  const [editando, setEditando] = useState(null);

  const cargarReservas = async () => {
    const res = await api.get("reservas/");
    setReservas(res.data);
  };

  useEffect(() => {
    cargarReservas();
  }, []);

  const crearReserva = async (e) => {
    e.preventDefault();
    await api.post("reservas/", nueva);
    setNueva({ usuario: 1, espacio: 1, fecha: "", hora_inicio: "", hora_fin: "" });
    cargarReservas();
  };

  const eliminarReserva = async (id) => {
    if (window.confirm("¿Eliminar esta reserva?")) {
      await api.delete(`reservas/${id}/`);
      cargarReservas();
    }
  };

  const guardarEdicion = async (e) => {
    e.preventDefault();
    await api.put(`reservas/${editando.id}/`, editando);
    setEditando(null);
    cargarReservas();
  };

  return (
    <div className="content-section">
      <h2>Gestión de Reservas</h2>

      <form onSubmit={crearReserva} className="formulario">
        <input
          type="date"
          value={nueva.fecha}
          onChange={(e) => setNueva({ ...nueva, fecha: e.target.value })}
          required
        />
        <input
          type="time"
          value={nueva.hora_inicio}
          onChange={(e) => setNueva({ ...nueva, hora_inicio: e.target.value })}
          required
        />
        <input
          type="time"
          value={nueva.hora_fin}
          onChange={(e) => setNueva({ ...nueva, hora_fin: e.target.value })}
          required
        />
        <button type="submit" className="btn-crear">Reservar</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Espacio</th>
            <th>Fecha</th>
            <th>Hora Inicio</th>
            <th>Hora Fin</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((r) => (
            <tr key={r.id}>
              <td>{r.usuario?.username || "—"}</td>
              <td>{r.espacio?.nombre || "—"}</td>
              <td>{r.fecha}</td>
              <td>{r.hora_inicio}</td>
              <td>{r.hora_fin}</td>
              <td>
                <button onClick={() => setEditando(r)}>✏️</button>
                <button onClick={() => eliminarReserva(r.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editando && (
        <div className="modal">
          <form onSubmit={guardarEdicion} className="formulario-modal">
            <h3>Editar Reserva</h3>
            <input
              type="date"
              value={editando.fecha}
              onChange={(e) => setEditando({ ...editando, fecha: e.target.value })}
            />
            <input
              type="time"
              value={editando.hora_inicio}
              onChange={(e) => setEditando({ ...editando, hora_inicio: e.target.value })}
            />
            <input
              type="time"
              value={editando.hora_fin}
              onChange={(e) => setEditando({ ...editando, hora_fin: e.target.value })}
            />
            <div className="modal-actions">
              <button type="submit">💾 Guardar</button>
              <button onClick={() => setEditando(null)}>❌ Cancelar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Reservas;
