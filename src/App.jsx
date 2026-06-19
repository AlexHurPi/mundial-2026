import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Recuerda mantener la configuración del proxy si la estás usando
  const API_URL = '/api-futbol/v4/competitions/WC/matches';

  useEffect(() => {
    const obtenerPartidos = async () => {
      try {
        const response = await fetch(API_URL, {
          // Asegúrate de poner tu token real aquí
          headers: { 'X-Auth-Token': 'ceb51703380443ca846d8be86de3ee05' } 
        });
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        setMatches(data.matches || []); 
        
      } catch (err) {
        console.error("Error cargando los datos:", err);
        setError("Hubo un problema al conectar con la API.");
      } finally {
        setLoading(false);
      }
    };

    obtenerPartidos();
  }, []);

  // --- NUEVA FUNCIÓN: Formatear la fecha y hora ---
  const formatearFecha = (fechaUtc) => {
    if (!fechaUtc) return 'Fecha por definir';
    const fecha = new Date(fechaUtc);
    // Formato ej: "11 jun, 15:00"
    return fecha.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getGroupMatches = () => {
    const groupMatches = matches.filter(match => match.stage === 'GROUP_STAGE');
    const groups = {};
    
    groupMatches.forEach(match => {
      const groupName = match.group ? match.group.replace('_', ' ') : 'Grupo Desconocido';
      if (!groups[groupName]) groups[groupName] = [];
      groups[groupName].push(match);
    });
    
    return groups;
  };

  const getKnockoutMatches = () => {
    return matches.filter(match => match.stage !== 'GROUP_STAGE');
  };  

  const groups = getGroupMatches();
  const knockoutMatches = getKnockoutMatches();

  return (
    <div className="app-container">
      <header>
        <h3 className="project-tag">PROJECT SHOWCASE</h3>
        <h1>App Mundial <br/><span>2026</span></h1>
        <p className="subtitle">Una experiencia interactiva diseñada en React para gestionar cada gol y cada llave del torneo más grande de la historia.</p>
      </header>

      {loading && <div className="status-message">Cargando datos del Mundial... ⏳</div>}
      {error && <div className="status-message error">⚠️ {error}</div>}

      {!loading && !error && (
        <>
          <section className="tournament-section">
            <h2 className="section-title">Fase de Grupos</h2>
            <div className="groups-grid">
              {Object.keys(groups).map((groupName, index) => (
                <div key={index} className="group-card">
                  <h3 className="group-title">{groupName}</h3>
                  <div className="matches-list">
                    {groups[groupName].map(match => (
                      
                      // Envolvemos todo el partido en un contenedor para poner la info arriba
                      <div key={match.id} className="match-wrapper">
                        
                        {/* --- NUEVO: Detalles del encuentro (Fecha, Hora y Estadio) --- */}
                        <div className="match-details">
                          {formatearFecha(match.utcDate)}
                          {/* Si venue existe, lo muestra, si no, no muestra nada */}
                          {match.venue && ` • 🏟️ ${match.venue}`}
                        </div>

                        <div className="match-row">
                          <div className="team">
                            <img src={match.homeTeam?.crest} alt="crest" className="crest" />
                            <span>{match.homeTeam?.tla || 'TBD'}</span>
                          </div>

                          <div className="score-box">
                            <input 
                              type="number" 
                              defaultValue={match.score?.fullTime?.home ?? ''} 
                              disabled={match.status === 'FINISHED'}
                            />
                            <span>-</span>
                            <input 
                              type="number" 
                              defaultValue={match.score?.fullTime?.away ?? ''} 
                              disabled={match.status === 'FINISHED'}
                            />
                          </div>

                          <div className="team team-right">
                            <span>{match.awayTeam?.tla || 'TBD'}</span>
                            <img src={match.awayTeam?.crest} alt="crest" className="crest" />
                          </div>
                        </div>
                        
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="tournament-section">
            <h2 className="section-title">Fase Eliminatoria (Llaves)</h2>
            <div className="bracket-view">
              {['LAST_32', 'LAST_16', 'QUARTER_FINALS', 'SEMI_FINALS', 'FINAL'].map(phase => {
                const phaseMatches = knockoutMatches.filter(m => m.stage === phase);
                if (phaseMatches.length === 0) return null;

                return (
                  <div key={phase} className="phase-column">
                    <h3 className="phase-title">{phase.replace('_', ' ')}</h3>
                    {phaseMatches.map(match => (
                      <div key={match.id} className="knockout-card">
                        
                        {/* Agregamos también la fecha en las llaves eliminatorias */}
                        <div className="match-details" style={{textAlign: 'center', marginBottom: '5px'}}>
                           {formatearFecha(match.utcDate)}
                        </div>

                        <div className="team-row">
                          <span>{match.homeTeam?.name || 'Por definir'}</span>
                          <strong>{match.score?.fullTime?.home ?? '-'}</strong>
                        </div>
                        <div className="team-row">
                          <span>{match.awayTeam?.name || 'Por definir'}</span>
                          <strong>{match.score?.fullTime?.away ?? '-'}</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default App;