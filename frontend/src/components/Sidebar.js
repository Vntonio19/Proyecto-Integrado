import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Calendar, Bell, Users, Settings } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">INACAP</h2>
      <ul>
        <li><Link to="/"><Home size={18}/> Inicio</Link></li>
        <li><Link to="/espacios"><Users size={18}/> Espacios</Link></li>
        <li><Link to="/reservas"><Calendar size={18}/> Reservas</Link></li>
        <li><Link to="/notificaciones"><Bell size={18}/> Notificaciones</Link></li>
        <li><Link to="/config"><Settings size={18}/> Configuración</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
