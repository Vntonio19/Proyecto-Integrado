import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./Static/UsersManager.css";

export default function UsersManager() {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({ nombre: "", correo: "", rol: "usuario" });
  const [editando, setEditando] = useState(null);

  // 🔁 Cargar usuarios al iniciar
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/usuarios/");
      setUsuarios(response.data);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudieron cargar los usuarios", "error");
    }
  };

  const crearUsuario = async () => {
    if (!nuevoUsuario.nombre || !nuevoUsuario.correo) {
      return Swal.fire("Atención", "Completa todos los campos", "warning");
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/usuarios/", nuevoUsuario);
      Swal.fire("Éxito", "Usuario creado correctamente", "success");
      setNuevoUsuario({ nombre: "", correo: "", rol: "usuario" });
      obtenerUsuarios();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo crear el usuario", "error");
    }
  };

  const eliminarUsuario = async (id) => {
    const confirmar = await Swal.fire({
      title: "¿Eliminar usuario?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d50000",
    });

    if (confirmar.isConfirmed) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/usuarios/${id}/`);
        Swal.fire("Eliminado", "Usuario eliminado correctamente", "success");
        obtenerUsuarios();
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "No se pudo eliminar el usuario", "error");
      }
    }
  };

  const actualizarUsuario = async () => {
    if (!editando) return;
    try {
      await axios.put(`http://127.0.0.1:8000/api/usuarios/${editando.id}/`, editando);
      Swal.fire("Actualizado", "Usuario editado correctamente", "success");
      setEditando(null);
      obtenerUsuarios();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo actualizar el usuario", "error");
    }
  };

  return (
    <div className="users-container">
      <h3>Gestión de Usuarios</h3>

      {/* Formulario para crear */}
      <div className="user-form">
        <input
          type="text"
          placeholder="Nombre"
          value={nuevoUsuario.nombre}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
        />
        <input
          type="email"
          placeholder="Correo"
          value={nuevoUsuario.correo}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, correo: e.target.value })}
        />
        <select
          value={nuevoUsuario.rol}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })}
        >
          <option value="usuario">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
        <button className="crear-btn" onClick={crearUsuario}>
          Crear
        </button>
      </div>

      {/* Tabla de usuarios */}
      <table className="tabla-usuarios">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>
                {editando?.id === u.id ? (
                  <input
                    value={editando.nombre}
                    onChange={(e) => setEditando({ ...editando, nombre: e.target.value })}
                  />
                ) : (
                  u.nombre
                )}
              </td>
              <td>
                {editando?.id === u.id ? (
                  <input
                    value={editando.correo}
                    onChange={(e) => setEditando({ ...editando, correo: e.target.value })}
                  />
                ) : (
                  u.correo
                )}
              </td>
              <td>
                {editando?.id === u.id ? (
                  <select
                    value={editando.rol}
                    onChange={(e) => setEditando({ ...editando, rol: e.target.value })}
                  >
                    <option value="usuario">Usuario</option>
                    <option value="admin">Administrador</option>
                  </select>
                ) : (
                  u.rol
                )}
              </td>
              <td>
                {editando?.id === u.id ? (
                  <button className="guardar-btn" onClick={actualizarUsuario}>
                    Guardar
                  </button>
                ) : (
                  <>
                    <button className="editar-btn" onClick={() => setEditando(u)}>
                      Editar
                    </button>
                    <button className="eliminar-btn" onClick={() => eliminarUsuario(u.id)}>
                      Eliminar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
