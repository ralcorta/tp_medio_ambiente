import React from 'react';
import { User, GraduationCap } from 'lucide-react';
import './Team.css';

const Team = () => {
  const members = [
    { name: 'Alcorta, Rodrigo Victor', lu: '1128661' },
    { name: 'Blanco, Nicole Camila', lu: '1112631' },
    { name: 'Rico, Candela Celeste', lu: '1155065' },
    { name: 'Rivero, Jose Leandro', lu: '1133855' },
    { name: 'Romero, Vanesa Aldana', lu: '1102825' },
    { name: 'Serra, Juan Cruz Bautista', lu: '1171704' },
  ];

  return (
    <section id="team" className="section">
      <div className="container">
        <h2 className="section-title">Equipo de Desarrollo</h2>
        <p className="section-subtitle">Grupo 04 - Tecnología y Medioambiente</p>

        <div className="team-grid">
          {members.map((member, index) => (
            <div className="team-card" key={index}>
              <div className="member-avatar">
                <User size={32} />
              </div>
              <div className="member-info">
                <h4>{member.name}</h4>
                <p>LU: {member.lu}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="professor-card">
          <div className="professor-icon">
            <GraduationCap size={40} />
          </div>
          <div className="professor-info">
            <h3>Profesor: Katarzynski, Lucas Guido</h3>
            <p>Cuatrimestre: 2 – Año: 2025</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
