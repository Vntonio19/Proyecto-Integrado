import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NotificacionesList = () => {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/notificaciones/')
      .then(res => setNotificaciones(res.data))
      .catch(err => console.error('Error al cargar notificaciones:', err));
  }, []);

   return (
    <div className="content-section">
      <h2>Notificaciones</h2>
      <ul className="list-group">
        {notificaciones.map(n => (
          <li key={n.id} className="list-group-item">
            {n.mensaje} <br />
            <small className="text-muted">{new Date(n.fecha_envio).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default NotificacionesList;
