import { useEffect, useState } from "react";
import { api } from "../../api";
import "./../../Styles/admin/CalendarAdmin.css";

const CalendarAdmin = () => {
  const [reservas, setReservas] = useState([]);

  const fetchReservas = async () => {
    try {
      const res = await api.get("/reservas/");
      setReservas(res.data);
    } catch (error) {
      console.error("Error cargando reservas", error);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Calendario de Reservas</h2>

      <div className="calendar-grid">
        {reservas.map((r) => (
          <div key={r.id} className="calendar-item">
            <p><strong>Sala:</strong> {r.sala_nombre}</p>
            <p><strong>Usuario:</strong> {r.usuario_nombre}</p>
            <p><strong>Fecha:</strong> {r.fecha}</p>
            <p><strong>Hora:</strong> {r.hora_inicio} - {r.hora_fin}</p>
            <span className={`estado ${r.estado.toLowerCase()}`}>
              {r.estado}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarAdmin;
