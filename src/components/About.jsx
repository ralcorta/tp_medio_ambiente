import React from 'react';
import { AlertTriangle, CheckCircle, Target, Shield } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      {/* Problem Section */}
      <section id="problem" className="section">
        <div className="container">
          <h2 className="section-title">El Desafío</h2>
          <p className="section-subtitle">
            Las reservas naturales de Argentina enfrentan amenazas críticas debido a la falta de monitoreo efectivo.
          </p>
          
          <div className="grid-3">
            <div className="card">
              <div className="icon-box alert">
                <AlertTriangle size={32} />
              </div>
              <h3>Incendios Forestales</h3>
              <p>
                La detección tardía de focos de incendio provoca daños irreversibles en ecosistemas vulnerables y pérdida de biodiversidad.
              </p>
            </div>
            
            <div className="card">
              <div className="icon-box alert">
                <Shield size={32} />
              </div>
              <h3>Actividades Ilegales</h3>
              <p>
                La tala ilegal y la caza furtiva avanzan sin control debido a la imposibilidad de vigilar grandes extensiones de territorio.
              </p>
            </div>
            
            <div className="card">
              <div className="icon-box alert">
                <Target size={32} />
              </div>
              <h3>Recursos Limitados</h3>
              <p>
                La insuficiencia de recursos humanos y tecnológicos dificulta la respuesta rápida de los guardaparques.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="section alt-bg">
        <div className="container">
          <h2 className="section-title">La Solución: WildEye</h2>
          <p className="section-subtitle">
            Una plataforma integral que combina tecnología satelital e inteligencia artificial.
          </p>

          <div className="solution-layout">
            <div className="solution-text">
              <h3>Monitoreo Inteligente</h3>
              <p>
                WildEye procesa imágenes de satélites Sentinel-2 y Landsat para detectar anomalías térmicas y cambios en la cobertura vegetal.
              </p>
              
              <ul className="feature-list">
                <li>
                  <CheckCircle size={20} color="var(--primary-color)" />
                  <span>Detección temprana de focos de incendio</span>
                </li>
                <li>
                  <CheckCircle size={20} color="var(--primary-color)" />
                  <span>Alertas automáticas en tiempo real</span>
                </li>
                <li>
                  <CheckCircle size={20} color="var(--primary-color)" />
                  <span>Análisis de patrones de movimiento</span>
                </li>
                <li>
                  <CheckCircle size={20} color="var(--primary-color)" />
                  <span>Panel de control centralizado</span>
                </li>
              </ul>
            </div>
            
            <div className="solution-visual">
              <div className="visual-card">
                <div className="visual-header">
                  <div className="dot red"></div>
                  <div className="dot yellow"></div>
                  <div className="dot green"></div>
                </div>
                <div className="visual-content">
                  <div className="code-block">
                    <span className="code-line">Analyzing sector A-14...</span>
                    <span className="code-line success"> Vegetation Index: Normal</span>
                    <span className="code-line">Scanning thermal bands...</span>
                    <span className="code-line warning"> Warning: Heat signature detected</span>
                    <span className="code-line">Coords: 28°32'S 57°11'W</span>
                    <span className="code-line alert">&gt;&gt; ALERT DISPATCHED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
