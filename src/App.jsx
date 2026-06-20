import React, { useState, useEffect } from 'react';
import './App.css';

// --- NUEVO: Diccionario para traducir equipos al español ---
// La API entrega los nombres en inglés. Aquí agregamos los más comunes.
// Puedes agregar más países a esta lista a medida que los necesites.
// --- NUEVO: Diccionario para traducir equipos al español ---
const diccionarioEquipos = {
  // Equipos extraídos exactamente como aparecen en tu archivo partidos.txt:
  "Mexico": "México",
  "South Africa": "Sudáfrica",
  "Korea Republic": "Corea del Sur", 
  "Czechia": "Republica Checa",
  "Canada": "Canadá",
  "Bosnia-H.": "Bosnia",
  "USA": "EE.UU",
  "Paraguay": "Paraguay",
  "Qatar": "Catar",
  "Switzerland": "Suiza",
  "Brazil": "Brasil",
  "Morocco": "Marruecos",
  "Haiti": "Haití",
  "Scotland": "Escocia",
  "Australia": "Australia",
  "Turkey": "Turquía",

  // Otros equipos comunes para completar el Mundial (por si la API los envía):
  "Spain": "España",
  "Germany": "Alemania",
  "England": "Inglaterra",
  "France": "Francia",
  "Japan": "Japón",
  "Netherlands": "Países Bajos",
  "Croatia": "Croacia",
  "Iraq": "Irak",
  "Algeria": "Argelia",
  "Jordan": "Jordania",
  "Congo DR": "RD Congo",
  "Curaçao": "Curazao",
  "Tunisia": "Tunez",
  "New Zealand": "Nueva Zelanda",
  "Cape Verde": "Cabo Verde",
  "Argentina": "Argentina",
  "Portugal": "Portugal",
  "Belgium": "Bélgica",
  "Italy": "Italia",
  "Uruguay": "Uruguay",
  "Colombia": "Colombia",
  "Chile": "Chile",
  "Peru": "Perú",
  "Ecuador": "Ecuador",
  "Senegal": "Senegal",
  "Cameroon": "Camerún",
  "Ghana": "Ghana",
  "Nigeria": "Nigeria",
  "Saudi Arabia": "Arabia Saudita",
  "Iran": "Irán",
  "Serbia": "Serbia",
  "Poland": "Polonia",
  "Denmark": "Dinamarca",
  "Sweden": "Suecia",
  "Norway": "Noruega",
  "Wales": "Gales",
  "Ukraine": "Ucrania",
  "Costa Rica": "Costa Rica",
  "Egypt": "Egipto",
  "Ivory Coast": "Costa de Marfil"
};

// --- NUEVO: Diccionario para las fases eliminatorias ---
const nombresFases = {
  'LAST_32': '16avos de Final',
  'LAST_16': 'Octavos de Final',
  'QUARTER_FINALS': 'Cuartos de Final',
  'SEMI_FINALS': 'Semifinal',
  'FINAL': 'Final'
};

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const URL = 'https://project-bqjnu.vercel.app/api/partidos'; // Esta URL es para probar en Vercel
  // const URL = 'partidos.json'; // Esta URL es para probar en local con el archivo partidos.json

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
    obtenerPartidos();
  }, []);

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
        <h1>Mundial <br/><span>2026</span></h1>
        <p className="subtitle">Copa Mundial de Fútbol 2026</p>
      </header>

      {/* --- NUEVO: Tarjeta de Partidos de Hoy --- */}
      {!loading && !error && partidosDeHoy.length > 0 && (
        <section className="today-section">
          <h2 className="section-title">Partidos de Hoy</h2>
          <div className="today-grid">
            {partidosDeHoy.map(match => (
              <div key={match.id} className="today-card">
                <div className="match-details">
                  {formatearFecha(match.utcDate)} {match.venue && ` • 🏟️ ${match.venue}`}
                </div>
                <div className="match-row">
                  <div className="team">
                    <img src={match.homeTeam?.crest} alt="crest" className="crest" />
                    <span className="team-name">{obtenerNombreEquipo(match.homeTeam)}</span>
                  </div>
                  <div className="score-box read-only">
                    <span>{match.score?.fullTime?.home ?? '-'}</span>
                    <span className="separator">vs</span>
                    <span>{match.score?.fullTime?.away ?? '-'}</span>
                  </div>
                  <div className="team team-right">
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
          {/* --- NUEVO: Tarjeta de Fase de Grupos --- */}
          <section className="tournament-section">
            <h2 className="section-title">Fase de Grupos</h2>
            <div className="groups-grid">
              {/* MODIFICADO: Object.keys(groups).sort() arregla el error de que el grupo D salga antes que el C */}
              {Object.keys(groups).sort().map((groupName, index) => (
                <div key={index} className="group-card">
                  <h3 className="group-title">{groupName}</h3>
                  <div className="matches-list">
                    {groups[groupName].map(match => (
                      <div key={match.id} className="match-wrapper">
                        <div className="match-details">
                          {formatearFecha(match.utcDate)}
                          {match.venue && ` • 🏟️ ${match.venue}`}
                        </div>

                        <div className="match-row">
                          <div className="team">
                            <img src={match.homeTeam?.crest} alt="crest" className="crest" />
                            {/* MODIFICADO: Usa el nombre traducido en lugar del TLA */}
                            <span className="team-name">{obtenerNombreEquipo(match.homeTeam)}</span>
                          </div>

                          {/* MODIFICADO: Eliminados los <input>, ahora son simples textos (spans) */}
                          <div className="score-box read-only">
                            <span className="score">{match.score?.fullTime?.home ?? '-'}</span>
                            <span className="separator">-</span>
                            <span className="score">{match.score?.fullTime?.away ?? '-'}</span>
                          </div>

                          <div className="team team-right">
                            <span className="team-name">{obtenerNombreEquipo(match.awayTeam)}</span>
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