import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Styles/admin/UserProfileAdmin.css";

export default function UserProfileAdmin() {
  const [user, setUser] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [editing, setEditing] = useState(false);

  const token = localStorage.getItem("token");

  // ===========================
  //   CARGAR DATOS DEL PERFIL
  // ===========================
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/perfil/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (!res.data.profile) {
          res.data.profile = {
            telefono: "",
            facultad: "",
            departamento: "",
            fecha_nacimiento: "",
            avatar: null,
          };
        }

        setUser(res.data);
        setAvatarPreview(res.data.profile.avatar);
      })
      .catch((err) => console.error(err));
  }, [token]);

  // ===========================
  //   CAMBIAR FOTO
  // ===========================
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      setUser({ ...user, avatarFile: file });
    }
  };

  // ===========================
  //   GUARDAR PERFIL
  // ===========================
  const handleSave = async () => {
    const formData = new FormData();

    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("first_name", user.first_name);
    formData.append("last_name", user.last_name);
    formData.append("telefono", user.profile.telefono);
    formData.append("facultad", user.profile.facultad);
    formData.append("departamento", user.profile.departamento);

    if (user.profile.fecha_nacimiento) {
      formData.append("fecha_nacimiento", user.profile.fecha_nacimiento);
    }

    if (user.avatarFile) {
      formData.append("avatar", user.avatarFile);
    }

    try {
      await axios.patch("http://127.0.0.1:8000/api/perfil/actualizar/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Perfil actualizado correctamente.");
      setEditing(false);
    } catch (error) {
      console.error(error);
      alert("Error al actualizar el perfil.");
    }
  };

  // ===========================
  //   CAMBIAR CONTRASEÑA
  // ===========================
  const handlePasswordChange = async () => {
    const oldPassword = prompt("Contraseña actual:");
    const newPassword = prompt("Nueva contraseña:");

    if (!oldPassword || !newPassword) return;

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/perfil/cambiar-password/",
        {
          old_password: oldPassword,
          new_password: newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Contraseña cambiada correctamente");
    } catch (error) {
      alert("Error al cambiar contraseña");
    }
  };

  // ===========================
  //   ESPERAR DATOS
  // ===========================
  if (!user) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="perfil-admin-container">
      <h1>Mi Perfil</h1>
      <p className="subtitulo">Administrador del Sistema</p>

      <div className="perfil-card">

        {/* FOTO */}
        <div className="foto-contenedor">
          <img
            src={
              avatarPreview
                ? `http://127.0.0.1:8000${avatarPreview}`
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="avatar"
            className="foto-perfil"
          />

          {editing && (
            <label className="btn-cambiar-foto">
              Cambiar Foto
              <input type="file" accept="image/*" onChange={handleAvatarChange} />
            </label>
          )}
        </div>

        {/* FORMULARIO */}
        <div className="perfil-form">
          <label>Nombre de Usuario</label>
          <input
            type="text"
            disabled={!editing}
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />

          <label>Email</label>
          <input
            type="text"
            disabled={!editing}
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <label>Nombre</label>
          <input
            type="text"
            disabled={!editing}
            value={user.first_name}
            onChange={(e) => setUser({ ...user, first_name: e.target.value })}
          />

          <label>Apellido</label>
          <input
            type="text"
            disabled={!editing}
            value={user.last_name}
            onChange={(e) => setUser({ ...user, last_name: e.target.value })}
          />

          <label>Teléfono</label>
          <input
            type="text"
            disabled={!editing}
            value={user.profile.telefono}
            onChange={(e) =>
              setUser({
                ...user,
                profile: { ...user.profile, telefono: e.target.value },
              })
            }
          />

          <label>Facultad</label>
          <input
            type="text"
            disabled={!editing}
            value={user.profile.facultad}
            onChange={(e) =>
              setUser({
                ...user,
                profile: { ...user.profile, facultad: e.target.value },
              })
            }
          />

          <label>Departamento</label>
          <input
            type="text"
            disabled={!editing}
            value={user.profile.departamento}
            onChange={(e) =>
              setUser({
                ...user,
                profile: { ...user.profile, departamento: e.target.value },
              })
            }
          />
        </div>

        {/* BOTONES */}
        <div className="acciones-perfil">
          {!editing ? (
            <button className="btn-rojo" onClick={() => setEditing(true)}>
              Editar Perfil
            </button>
          ) : (
            <>
              <button className="btn-verde" onClick={handleSave}>
                Guardar Cambios
              </button>
              <button className="btn-gris" onClick={() => setEditing(false)}>
                Cancelar
              </button>
            </>
          )}

          <button className="btn-azul" onClick={handlePasswordChange}>
            Cambiar Contraseña
          </button>
        </div>
      </div>
    </div>
  );
}
