import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./Static/EspaciosList.css";

const API_URL = "http://127.0.0.1:8000/api/espacios/";

export default function EspaciosList() {
  const [espacios, setEspacios] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: "", tipo: "", capacidad: "", ubicacion: "" });
  const [editando, setEditando] = useState(null);

  // ✅ Memoriza token y headers (sin warnings)
  const token = useMemo(() => localStorage.getItem("token"), []);
  const headers = useMemo(
    () => (token ? { Authorization: `Bearer ${token}` } : {}),
    [token]
  );

  // ✅ useCallback evita recrear la función en cada render
  const cargarEspacios = useCallback(async () => {
    try {
      const res = await axios.get(API_URL, { headers });
      setEspacios(res.data);
    } catch (error) {
      console.error("Error al cargar espacios:", error);
      Swal.fire("Error", "No se pudieron cargar los espacios.", "error");
    }
  }, [headers]);

  useEffect(() => {
    cargarEspacios();
  }, [cargarEspacios]);

  // ✅ Crear nuevo espacio
  const crearEspacio = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, nuevo, { headers });
      setNuevo({ nombre: "", tipo: "", capacidad: "", ubicacion: "" });
      Swal.fire("¡Éxito!", "Espacio creado correctamente", "success");
      cargarEspacios();
    } catch (error) {
      if (error.response && error.response.status === 403) {
        Swal.fire("Acceso denegado", "Solo los administradores pueden crear espacios.", "warning");
      } else {
        Swal.fire("Error", "No se pudo crear el espacio, intenta nuevamente.", "error");
      }
      console.error("Error al crear espacio:", error);
    }
  };

  // ✅ Eliminar espacio
  const eliminarEspacio = async (id) => {
    const confirmar = await Swal.fire({
      title: "¿Eliminar espacio?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d40000",
      cancelButtonColor: "#777",
      confirmButtonText: "Sí, eliminar",
    });

    if (confirmar.isConfirmed) {
      try {
        await axios.delete(`${API_URL}${id}/`, { headers });
        Swal.fire("Eliminado", "Espacio eliminado correctamente", "success");
        cargarEspacios();
      } catch (error) {
        if (error.response && error.response.status === 403) {
          Swal.fire("Acceso denegado", "Solo los administradores pueden eliminar espacios.", "warning");
        } else {
          Swal.fire("Error", "No se pudo eliminar el espacio.", "error");
        }
        console.error("Error al eliminar espacio:", error);
      }
    }
  };

  // ✅ Guardar edición
  const guardarEdicion = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}${editando.id}/`, editando, { headers });
      Swal.fire("Actualizado", "Espacio editado correctamente", "success");
      setEditando(null);
      cargarEspacios();
    } catch (error) {
      if (error.response && error.response.status === 403) {
        Swal.fire("Acceso denegado", "Solo los administradores pueden editar espacios.", "warning");
      } else {
        Swal.fire("Error", "No se pudo actualizar el espacio.", "error");
      }
      console.error("Error al actualizar espacio:", error);
    }
  };

  return (
    <div className="content-section">
      <h2>Gestión de Espacios</h2>

      {/* 📝 Formulario de creación */}
      <form onSubmit={crearEspacio} className="formulario">
        <input
          type="text"
          placeholder="Nombre"
          value={nuevo.nombre}
          onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Tipo"
          value={nuevo.tipo}
          onChange={(e) => setNuevo({ ...nuevo, tipo: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Capacidad"
          value={nuevo.capacidad}
          onChange={(e) => setNuevo({ ...nuevo, capacidad: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Ubicación"
          value={nuevo.ubicacion}
          onChange={(e) => setNuevo({ ...nuevo, ubicacion: e.target.value })}
          required
        />
        <button type="submit" className="btn btn-crear">Crear</button>
      </form>

      {/* 📋 Tabla de espacios */}
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Capacidad</th>
            <th>Ubicación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {espacios.map((e) => (
            <tr key={e.id}>
              <td>{e.nombre}</td>
              <td>{e.tipo}</td>
              <td>{e.capacidad}</td>
              <td>{e.ubicacion}</td>
              <td>
                <button className="btn-edit" onClick={() => setEditando(e)}>✏️</button>
                <button className="btn-delete" onClick={() => eliminarEspacio(e.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✏️ Modal de edición */}
      {editando && (
        <div className="modal">
          <form onSubmit={guardarEdicion} className="formulario-modal">
            <h3>Editar Espacio</h3>
            <input
              type="text"
              value={editando.nombre}
              onChange={(e) => setEditando({ ...editando, nombre: e.target.value })}
            />
            <input
              type="text"
              value={editando.tipo}
              onChange={(e) => setEditando({ ...editando, tipo: e.target.value })}
            />
            <input
              type="number"
              value={editando.capacidad}
              onChange={(e) => setEditando({ ...editando, capacidad: e.target.value })}
            />
            <input
              type="text"
              value={editando.ubicacion}
              onChange={(e) => setEditando({ ...editando, ubicacion: e.target.value })}
            />
            <div className="modal-actions">
              <button type="submit" className="btn-guardar">Guardar</button>
              <button type="button" onClick={() => setEditando(null)} className="btn-cancelar">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
