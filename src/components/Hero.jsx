import React from 'react';
import { ChevronRight, Activity } from 'lucide-react';
import './Hero.css';

const Hero = ({ onNavigate }) => {
  return (
    <section id="hero" className="hero">
      <div className="hero-bg"></div>
      <div className="hero-overlay"></div>
      
      <div className="container hero-content">
        <div className="hero-badge">
          <Activity size={16} />
          <span>Sistema de Monitoreo Activo</span>
        </div>
        
        <h1 className="hero-title">
          Protegiendo el <span className="highlight">Patrimonio Natural</span> de Argentina
        </h1>
        
        <p className="hero-subtitle">
          WildEye utiliza inteligencia artificial e imágenes satelitales para detectar incendios y actividades ilegales en tiempo real.
        </p>
        
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => onNavigate('demo')}>
            Ver Demo en Vivo <ChevronRight size={20} />
          </button>
          <button className="btn btn-outline" onClick={() => onNavigate('problem')}>
            Conocer Más
          </button>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-value">+500</span>
            <span className="stat-label">Áreas Protegidas</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">24/7</span>
            <span className="stat-label">Monitoreo Satelital</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">AI</span>
            <span className="stat-label">Detección Temprana</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
