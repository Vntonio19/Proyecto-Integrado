import { useEffect, useState } from "react";
import { api } from "../../api"; // <-- tu api.js del frontend
import "../../Styles/admin/TareasAseo.css";

export default function TareasAseo() {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarTareas = async () => {
    try {
      setLoading(true);
      setError(null);

      // AJUSTA ESTE ENDPOINT a lo que tengas en el backend
      const res = await api.get("/aseo/tareas/");
      setTareas(res.data);
    } catch (err) {
      console.error("Error cargando tareas de aseo", err);
      setError("No se pudieron cargar las tareas de aseo.");
    } finally {
      setLoading(false);
    }
  };

  const marcarComoLimpia = async (tareaId) => {
    try {
      // AJUSTA ESTE ENDPOINT a tu API real
      await api.patch(`/aseo/tareas/${tareaId}/`, {
        estado_limpieza: "COMPLETADA",
      });

      // Actualiza el estado en el frontend
      setTareas((prev) =>
        prev.map((t) =>
          t.id === tareaId ? { ...t, estado_limpieza: "COMPLETADA" } : t
        )
      );
    } catch (err) {
      console.error("Error marcando como limpia", err);
      alert("No se pudo marcar la sala como limpia. Revisa la consola.");
    }
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  return (
    <div className="aseo-container">
      <div className="aseo-header">
        <h2>Área de Aseo - Tareas Pendientes</h2>
        <button className="aseo-refresh-btn" onClick={cargarTareas}>
          Actualizar
        </button>
      </div>

      {loading && <p>Cargando tareas de aseo...</p>}
      {error && <p className="aseo-error">{error}</p>}

      {!loading && !error && tareas.length === 0 && (
        <p>No hay tareas de limpieza pendientes.</p>
      )}

      <div className="aseo-table-wrapper">
        <table className="aseo-table">
          <thead>
            <tr>
              <th>Sala</th>
              <th>Fecha</th>
              <th>Horario</th>
              <th>Responsable</th>
              <th>Estado limpieza</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {tareas.map((t) => (
              <tr key={t.id}>
                <td>{t.sala_nombre || t.sala || "N/A"}</td>
                <td>{t.fecha || "N/A"}</td>
                <td>
                  {(t.hora_inicio || "") + (t.hora_fin ? ` - ${t.hora_fin}` : "")}
                </td>
                <td>{t.responsable || t.personal_aseo || "N/A"}</td>
                <td>
                  <span
                    className={
                      "badge-limpieza " +
                      (t.estado_limpieza
                        ? t.estado_limpieza.toLowerCase()
                        : "pendiente")
                    }
                  >
                    {t.estado_limpieza || "PENDIENTE"}
                  </span>
                </td>
                <td>
                  {t.estado_limpieza === "COMPLETADA" ? (
                    <span className="aseo-completada">✔ Completada</span>
                  ) : (
                    <button
                      className="aseo-action-btn"
                      onClick={() => marcarComoLimpia(t.id)}
                    >
                      Marcar como limpia
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
