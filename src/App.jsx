import React, { useState, useEffect } from 'react';
import { diccionarioEquipos } from './diccionario.js';
import { nombresFases } from './diccionario.js';
import { GroupCard }  from './components/GroupCard.jsx';
import { AnuncioAdsense } from './components/AnuncioAdsense.jsx';
import './App.css';

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const URL = 'https://project-bqjnu.vercel.app/api/partidos'; // Esta URL es para probar en Vercel
  //const URL = 'partidos.json'; // Esta URL es para probar en local con el archivo partidos.json

useEffect(() => {
    const obtenerPartidos = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        setMatches(data.matches || []);
      } catch (err) {
        console.error("Error cargando los datos:", err);
        setError("Hubo un problema al cargar los partidos.");
      } finally {
        setLoading(false);
      }
    };

    // 1. Llamamos a la función la primera vez que la app "nace"
    obtenerPartidos();

    // -----------------------------------------------------------
    // INICIA EL "VIGILANTE"
    // -----------------------------------------------------------
    
    // 2. Vigilante 1: Detecta cuando el celular/pestaña vuelve a estar visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log("La app está visible de nuevo, actualizando datos...");
        obtenerPartidos(); // Descarga los datos de fondo
      }
    };

    // 3. Vigilante 2: Detecta cuando haces clic de vuelta en la pestaña (en PC)
    const handleFocus = () => {
      console.log("La ventana recuperó el foco, actualizando datos...");
      obtenerPartidos();
    };

    // 4. Contratamos a los vigilantes (Event Listeners)
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    // 5. Despedimos a los vigilantes cuando la app se cierra (Limpieza / Cleanup)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
    // -----------------------------------------------------------
    // TERMINA EL "VIGILANTE"
    // -----------------------------------------------------------

  }, []); // Los corchetes vacíos aseguran que este bloque se active una sola vez

  /*useEffect(() => {
    const obtenerPartidos = async () => {
      try {
        const response = await fetch(URL); 
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        setMatches(data.matches || []); 
      } catch (err) {
        console.error("Error cargando los datos:", err);
        setError("Hubo un problema al cargar los partidos.");
      } finally {
        setLoading(false);
      }
    };
    obtenerPartidos();
  }, []);*/

  const formatearFecha = (fechaUtc) => {
    if (!fechaUtc) return 'Fecha por definir';
    const fecha = new Date(fechaUtc);
    return fecha.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Función para obtener el nombre traducido o el shortName
  const obtenerNombreEquipo = (team) => {
    if (!team) return 'Por definir';
    const nombreOriginal = team.shortName || team.name;
    return diccionarioEquipos[nombreOriginal] || nombreOriginal;
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

  // --Funcion para obtener los partidos de hoy, de acuerdo a la fecha local--
  const getPartidosDeHoy = () => {
    // 1. Obtenemos la fecha local actual del dispositivo (ej. "Fri Jun 19 2026")
    const hoyLocalString = new Date().toDateString(); 

    return matches.filter(match => {
      if (!match.utcDate) return false;
      
      // 2. Convertimos la fecha UTC del partido a la zona horaria del usuario
      const fechaPartidoLocalString = new Date(match.utcDate).toDateString();
      
      // 3. Comparamos si ambas fechas caen exactamente en el mismo día local
      return fechaPartidoLocalString === hoyLocalString;
    });
  };

  const groups = getGroupMatches();
  const knockoutMatches = getKnockoutMatches();
  const partidosDeHoy = getPartidosDeHoy();

  return (
    <div className="app-container">
      <header>
        <img src="logo-mundial.png" alt="Logo Mundial 2026" className="logo" />
        <h1>Mundial <br/><span>2026⚽​</span></h1>
        <p className="subtitle">Copa Mundial de Fútbol 2026</p>
      </header>

{/* ------------------------------------------Tarjeta de Partidos de Hoy ------------------------------------------*/}
      {!loading && !error && partidosDeHoy.length > 0 && (
        <section className="today-section">
          <h2 className="section-title">Partidos de Hoy</h2>
          <AnuncioAdsense />
          <div className="today-grid">
            {partidosDeHoy.map(match => (
              <div key={match.id} className="today-card">

                <div className="match-details">
                    <div className="match-header-info">
                        {/* Validamos si hay un grupo para mostrarlo, reemplazando "GROUP_" por "Grupo " */}
                        {match.group && (
                          <span className="match-group-badge">
                            {match.group.replace('GROUP_', 'Grupo ')}
                          </span>
                        )}
                        <span className="match-date">{formatearFecha(match.utcDate)}</span>
                    </div>
                  {/*{formatearFecha(match.utcDate)} {match.venue && ` • 🏟️ ${match.venue}`}*/}

                </div>
                  <div className="match-row">
                    <div className="team-today">
                      <img src={match.homeTeam?.crest} alt="crest" className="crest" />
                      {/* MODIFICADO: Usa el nombre traducido en lugar del TLA */}
                      <span className="team-name">{obtenerNombreEquipo(match.homeTeam)}</span>
                    </div>

                    {/* MODIFICADO: Eliminados los <input>, ahora son simples textos (spans) */}
                    <div className="score-box read-only">
                      <span className="score">{match.score?.fullTime?.home ?? '-'}</span>
                      <span className="separator">vs</span>
                      <span className="score">{match.score?.fullTime?.away ?? '-'}</span>
                    </div>

                    <div className="team-today team-right">
                      <span className="team-name">{obtenerNombreEquipo(match.awayTeam)}</span>
                      <img src={match.awayTeam?.crest} alt="crest" className="crest" />
                    </div>
                  </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {loading && <div className="status-message">Cargando datos del Mundial... ⏳</div>}
      {error && <div className="status-message error">⚠️ {error}</div>}

      {!loading && !error && (
        <>
{/* ---------------------------- NUEVO: Tarjeta de Fase de Grupos ---------------------------------- */}
          <section className="tournament-section">
           {/* ---------------------------- NUEVO: Tarjeta de Fase de Grupos ---------------------------------- */}

<div className="section-title">Fase de Grupos</div>

<div className="groups-grid">
  {Object.keys(groups).sort().map((groupName) => (
    <GroupCard 
      key={groupName} 
      groupName={groupName} 
      matches={groups[groupName]} 
      obtenerNombreEquipo={obtenerNombreEquipo} 
      formatearFecha={formatearFecha} 
    />
  ))}
</div>
          </section>
{/* --- --------------------------------Tarjeta de Fase Eliminatoria (Llaves) ----------------------------- */}
          <section className="tournament-section">
            <h2 className="section-title">Fase Eliminatoria (Llaves)</h2>
            <div className="bracket-view">
              {['LAST_32', 'LAST_16', 'QUARTER_FINALS', 'SEMI_FINALS', 'FINAL'].map(phase => {
                const phaseMatches = knockoutMatches.filter(m => m.stage === phase);
                if (phaseMatches.length === 0) return null;

                return (
                  <div key={phase} className="phase-column">
                    {/* MODIFICADO: Usa el diccionario para mostrar nombres en español */}
                    <h3 className="phase-title">{nombresFases[phase] || phase}</h3>
                    {phaseMatches.map(match => (
                      <div key={match.id} className="knockout-card">
                        <div className="match-details" style={{textAlign: 'center', marginBottom: '8px'}}>
                           {formatearFecha(match.utcDate)}
                        </div>
                        <div className="team-row">
                          <span>{obtenerNombreEquipo(match.homeTeam)}</span>
                          <strong>{match.score?.fullTime?.home ?? 'Por definir-'}</strong>
                        </div>
                        <div className="team-row">
                          <span>{obtenerNombreEquipo(match.awayTeam)}</span>
                          <strong>{match.score?.fullTime?.away ?? 'Por definir-'}</strong>
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