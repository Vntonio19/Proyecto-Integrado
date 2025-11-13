import React from 'react';
import './Static/Header.css'; // ajusta la ruta según tu estructura

const Header = ({ logout }) => {
  return (
    <header className="header">
      <div className="header-info">
        <div>
          <h3>José Antonio Lefimilla Arellana</h3>
          <p>Sistema de Reservas</p>
        </div>
      </div>

      <div className="header-right">
        <img
          src="https://i.imgur.com/zYxDCQT.png"
          alt="Perfil"
          className="profile-img"
        />
        <button className="logout-btn" onClick={logout}>
          Salir
        </button>
      </div>
    </header>
  );
};

export default Header;
