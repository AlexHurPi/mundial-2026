import React, { useState } from 'react';
import './groupCard.css';


// --- NUEVO COMPONENTE: GroupCard ---
export const GroupCard = ({ groupName, matches, obtenerNombreEquipo, formatearFecha }) => {
  const [activeTab, setActiveTab] = useState('partidos');

  // Lógica para calcular la tabla de posiciones dinámicamente
  const calcularTabla = () => {
    const stats = {};

    matches.forEach((match) => {
      const home = match.homeTeam;
      const away = match.awayTeam;

      // Usar ID como clave, o el nombre como respaldo (para equipos por definir)
      const homeKey = home.id || home.name || `TBD-H-${match.id}`;
      const awayKey = away.id || away.name || `TBD-A-${match.id}`;

      // Inicializar estadísticas si el equipo no existe en el registro
      if (!stats[homeKey]) stats[homeKey] = { ...home, pts: 0, pj: 0, gf: 0, gc: 0 };
      if (!stats[awayKey]) stats[awayKey] = { ...away, pts: 0, pj: 0, gf: 0, gc: 0 };

      // Si el partido tiene un marcador registrado
      const score = match.score?.fullTime;
      if (score && score.home !== null && score.away !== null) {
        const hGoals = score.home;
        const aGoals = score.away;

        // Sumar Partidos Jugados (PJ)
        stats[homeKey].pj += 1;
        stats[awayKey].pj += 1;

        // Sumar Goles a Favor (GF) y Goles en Contra (GC)
        stats[homeKey].gf += hGoals;
        stats[homeKey].gc += aGoals;
        stats[awayKey].gf += aGoals;
        stats[awayKey].gc += hGoals;

        // Evaluar Puntos (Pts)
        if (hGoals > aGoals) {
          stats[homeKey].pts += 3; // Victoria local
        } else if (hGoals < aGoals) {
          stats[awayKey].pts += 3; // Victoria visitante
        } else {
          stats[homeKey].pts += 1; // Empate
          stats[awayKey].pts += 1; // Empate
        }
      }
    });

    // Calcular la Diferencia de Goles (DG) y Ordenar la tabla
    return Object.values(stats)
      .map((team) => ({
        ...team,
        dg: team.gf - team.gc,
      }))
      .sort((a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts; // 1ro: Puntos
        if (b.dg !== a.dg) return b.dg - a.dg;     // 2do: Gol Diferencia
        return b.gf - a.gf;                        // 3ro: Goles a Favor
      });
  };

  const getStatus = (status) => {
    //if (status === 'SCHEDULED') return 'Programado';
    if (status === 'IN_PLAY') return 'En Juego';
    if (status === 'LIVE') return 'En Juego';
    if (status === 'PAUSED') return 'Medio tiempo';
    if (status === 'FINISHED') return 'Finalizado';
    return null;
    
  };
  const tabla = calcularTabla();
  const nombreGrupoLimpio = groupName.replace('GROUP', 'Grupo ');

  return (
    <div className="group-card-container">
      {/* Encabezado con Pestañas */}
      <div className="group-header">
        <h3 className="group-title">{nombreGrupoLimpio}</h3>
        <div className="group-tabs">
          <button
            className={`tab-btn ${activeTab === 'partidos' ? 'active' : ''}`}
            onClick={() => setActiveTab('partidos')}
          >
            Partidos
          </button>
          <button
            className={`tab-btn ${activeTab === 'tabla' ? 'active' : ''}`}
            onClick={() => setActiveTab('tabla')}
          >
            Tabla
          </button>
        </div>
      </div>

      {/* Contenido Dinámico */}
      <div className="group-content">
        {activeTab === 'partidos' ? (
          <div className="matches-list">
            {/* Aquí renderizamos los partidos */}
            {matches.map((match) => (
               <div key={match.id} className="match-wrapper">
                  {/* NOTA: Pega aquí la estructura de divs de tu tarjeta de partido original. 
                      Lo simplifico para el ejemplo: */}
{/*----------------------------------------------------------------------------------------------- */} 
                  
                        <div className="match-details">
                            <span>{formatearFecha(match.utcDate)}</span>
                             {(() => { 
                                  const statusText = getStatus(match.status); 
                                  
                                  // 3. Si es null, simplemente retornamos null y React no dibuja nada
                                  if (!statusText) return null;

                                  // Mapeamos el texto del estado a su clase CSS correspondiente
                                  const clasesPorEstado = {
                                    'En Juego': 'match-status',      // Condición 1
                                    'Medio tiempo': 'match-status',  // Condición 1
                                    'Finalizado': 'none'   // Condición 2
                                  };

                                  // Buscamos la clase. Si por alguna razón no coincide, usa 'match-status' por defecto
                                  const claseAplicada = clasesPorEstado[statusText] || 'match-status';

                                  return (
                                    <span className={claseAplicada}>{statusText}</span>
                                  ); 
                              })()}
                            
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
                        
{/*----------------------------------------------------------------------------------------------- */}  
               </div>
            ))}
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="standings-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th className="team-col-header">Equipo</th>
                  <th title="Partidos Jugados">PJ</th>
                  <th title="Diferencia de Goles">DG</th>
                  <th title="Puntos">Pts</th>
                </tr>
              </thead>
              <tbody>
                {tabla.map((team, index) => (
                  <tr key={team.id || index}>
                    <td className="pos-col">{index + 1}</td>
                    <td className="team-col-td">
                      {team.crest ? (
                        <img src={team.crest} alt="bandera" className="team-crest-small" />
                      ) : (
                        <div className="team-crest-placeholder"></div>
                      )}
                      <span className="team-name-table">{obtenerNombreEquipo(team)}</span>
                    </td>
                    <td>{team.pj}</td>
                    <td className="dg-col">{team.dg > 0 ? `+${team.dg}` : team.dg}</td>
                    <td className="pts-col">{team.pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};