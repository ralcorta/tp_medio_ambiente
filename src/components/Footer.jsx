import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>WildEye</h4>
            <p>Monitoreo Satelital de Reservas Naturales en Argentina</p>
          </div>
          <div className="footer-section">
            <h4>Referencias</h4>
            <ul>
              <li><a href="#">CONAE</a></li>
              <li><a href="#">NASA Earth Data</a></li>
              <li><a href="#">European Space Agency</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contacto</h4>
            <p>Grupo 04 - Tecnología y Medioambiente</p>
            <p>Universidad de Palermo - 2025</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 WildEye Project. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
