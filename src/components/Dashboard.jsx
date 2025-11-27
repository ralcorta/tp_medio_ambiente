import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, CircleMarker, useMap } from 'react-leaflet';
import { X, AlertTriangle, Flame, Activity, Wind, Thermometer, Layers, User, PawPrint, ShieldCheck, ShieldAlert } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.heat';
import './Dashboard.css';

// Fix for Leaflet default icon issues in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Heatmap Component
const HeatmapLayer = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !points || points.length === 0) return;

    const heat = L.heatLayer(points, {
      radius: 25,
      blur: 15,
      maxZoom: 10,
      max: 1.0,
      gradient: {
        0.4: 'blue',
        0.6: 'cyan',
        0.7: 'lime',
        0.8: 'yellow',
        1.0: 'red'
      }
    }).addTo(map);

    return () => {
      map.removeLayer(heat);
    };
  }, [map, points]);

  return null;
};

const Dashboard = ({ onClose }) => {
  const [alerts] = useState([
    { id: 1, type: 'fire', lat: -28.54, lng: -57.35, severity: 'high', time: '10:42 AM' },
    { id: 2, type: 'illegal', lat: -28.62, lng: -57.45, severity: 'medium', time: '09:15 AM' },
  ]);

  const [entities, setEntities] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);

  const [stats, setStats] = useState({
    temp: 32,
    wind: 15,
    humidity: 45
  });

  // Generate Entities and Heatmap Data
  useEffect(() => {
    const generateData = () => {
      const newEntities = [];
      const heatPoints = [];
      
      // Center around the fire alert
      const centerLat = -28.54;
      const centerLng = -57.35;
      
      const entityTypes = [
        { type: 'animal', label: 'Carpincho', status: 'neutral', color: '#0ea5e9' }, // Blue
        { type: 'animal', label: 'Ciervo de los Pantanos', status: 'neutral', color: '#0ea5e9' },
        { type: 'animal', label: 'Yaguareté', status: 'neutral', color: '#0ea5e9' },
        { type: 'human', label: 'Guardaparque', status: 'authorized', color: '#10b981' }, // Green
        { type: 'human', label: 'Desconocido', status: 'unauthorized', color: '#ef4444' }, // Red
      ];

      // Create entities
      for (let i = 0; i < 50; i++) {
        // Random distribution around center
        const latOffset = (Math.random() - 0.5) * 0.06;
        const lngOffset = (Math.random() - 0.5) * 0.06;
        const lat = centerLat + latOffset;
        const lng = centerLng + lngOffset;
        
        // Determine entity type based on probability
        const rand = Math.random();
        let entityType;
        if (rand > 0.9) entityType = entityTypes[4]; // Unauthorized (10%)
        else if (rand > 0.8) entityType = entityTypes[3]; // Authorized (10%)
        else entityType = entityTypes[Math.floor(Math.random() * 3)]; // Animals (80%)

        const entity = {
          id: i,
          lat,
          lng,
          ...entityType,
          confidence: (0.85 + Math.random() * 0.14).toFixed(2) // 85-99% confidence
        };

        newEntities.push(entity);
        
        // Add to heatmap (intensity based on type importance/heat signature)
        // Animals/Humans have high heat signature
        heatPoints.push([lat, lng, 1.0]); 
      }

      // Add background noise to heatmap
      for (let i = 0; i < 100; i++) {
         heatPoints.push([
          -28.55 + (Math.random() - 0.5) * 0.2,
          -57.40 + (Math.random() - 0.5) * 0.2,
          Math.random() * 0.3
        ]);
      }

      setEntities(newEntities);
      setHeatmapData(heatPoints);
    };

    generateData();
  }, []);

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        temp: prev.temp + (Math.random() - 0.5),
        wind: Math.max(0, prev.wind + (Math.random() - 0.5) * 2),
        humidity: Math.min(100, Math.max(0, prev.humidity + (Math.random() - 0.5) * 3))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-overlay">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <Activity className="pulse" color="var(--alert-color)" />
          <span>WildEye Live Monitor - Parque Nacional Iberá</span>
        </div>
        <button className="close-btn" onClick={onClose}>
          <X /> Cerrar Demo
        </button>
      </div>

      <div className="dashboard-content">
        <div className="sidebar">
          <div className="stat-panel">
            <h3>Condiciones Actuales</h3>
            <div className="stat-row">
              <Thermometer size={20} />
              <span>{stats.temp.toFixed(1)}°C</span>
            </div>
            <div className="stat-row">
              <Wind size={20} />
              <span>{stats.wind.toFixed(1)} km/h</span>
            </div>
            <div className="stat-row">
              <div className="humidity-icon">%</div>
              <span>{stats.humidity.toFixed(0)}% Humedad</span>
            </div>
          </div>

          <div className="alerts-panel">
            <h3>Alertas Recientes</h3>
            <div className="alerts-list">
              {alerts.map(alert => (
                <div key={alert.id} className={`alert-item ${alert.type}`}>
                  {alert.type === 'fire' ? <Flame size={18} /> : <AlertTriangle size={18} />}
                  <div className="alert-info">
                    <span className="alert-type">
                      {alert.type === 'fire' ? 'Foco de Incendio' : 'Actividad Sospechosa'}
                    </span>
                    <span className="alert-time">{alert.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="status-panel">
            <div className="status-indicator active">
              <div className="status-dot"></div>
              Satelite Sentinel-2: ONLINE
            </div>
            <div className="status-indicator active">
              <div className="status-dot"></div>
              AI Processing: ACTIVE
            </div>
            <div className="status-indicator active">
              <div className="status-dot"></div>
              Heatmap Analysis: READY
            </div>
          </div>
          
          <div className="legend-panel">
             <h3>Referencias</h3>
             <div className="legend-item">
               <div className="legend-dot" style={{background: '#ef4444'}}></div>
               <span>No Autorizado</span>
             </div>
             <div className="legend-item">
               <div className="legend-dot" style={{background: '#10b981'}}></div>
               <span>Autorizado</span>
             </div>
             <div className="legend-item">
               <div className="legend-dot" style={{background: '#0ea5e9'}}></div>
               <span>Fauna</span>
             </div>
          </div>
        </div>

        <div className="map-container">
          <MapContainer 
            center={[-28.55, -57.40]} 
            zoom={12} 
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
          >
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='Tiles &copy; Esri'
            />
            
            <HeatmapLayer points={heatmapData} />

            {/* Render Entities */}
            {entities.map(entity => (
              <CircleMarker 
                key={entity.id}
                center={[entity.lat, entity.lng]}
                radius={6}
                pathOptions={{
                  color: 'white',
                  weight: 1,
                  fillColor: entity.color,
                  fillOpacity: 0.8
                }}
              >
                <Popup className="entity-popup">
                  <div className="popup-content">
                    <div className="popup-header">
                      {entity.type === 'human' ? 
                        (entity.status === 'authorized' ? <ShieldCheck size={16} color={entity.color}/> : <ShieldAlert size={16} color={entity.color}/>) 
                        : <PawPrint size={16} color={entity.color}/>
                      }
                      <strong>{entity.label}</strong>
                    </div>
                    <div className="popup-details">
                      <p>Estado: <span style={{color: entity.color, fontWeight: 'bold'}}>{entity.status.toUpperCase()}</span></p>
                      <p>Confianza AI: {Math.round(entity.confidence * 100)}%</p>
                      <p className="coords">{entity.lat.toFixed(4)}, {entity.lng.toFixed(4)}</p>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}

            {alerts.map(alert => (
              <React.Fragment key={alert.id}>
                <Circle 
                  center={[alert.lat, alert.lng]}
                  pathOptions={{ 
                    color: alert.type === 'fire' ? 'red' : 'orange',
                    fillColor: alert.type === 'fire' ? 'red' : 'orange',
                    fillOpacity: 0.1
                  }}
                  radius={alert.type === 'fire' ? 3000 : 500}
                />
                <Marker position={[alert.lat, alert.lng]}>
                  <Popup>
                    <strong>{alert.type === 'fire' ? 'INCENDIO DETECTADO' : 'ALERTA DE SEGURIDAD'}</strong><br />
                    Severidad: {alert.severity}<br />
                    Coords: {alert.lat}, {alert.lng}
                  </Popup>
                </Marker>
              </React.Fragment>
            ))}
          </MapContainer>
          
          <div className="map-overlay-info">
            <div className="overlay-badge">
              <Layers size={14} />
              Vista Térmica + Identificación AI
            </div>
            Vista Satelital en Tiempo Real
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
