/**
**Este archivo contiene un diccionario de equipos y fases para traducirlos al español con el objeto 'diccionarioEquipos'
**El objetivo de este diccionario es poder traducir los equipos y fases de el archivo JSON al spañol para que se vea mejor en la UI de la app
*/

// --- Diccionario: para traducir equipos al español ---
// La API entrega los nombres en inglés. Aquí agregamos los más comunes.
// Puedes agregar más países a esta lista a medida que los necesites.


export const diccionarioEquipos = {
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
export const nombresFases = {
  'LAST_32': '16avos de Final',
  'LAST_16': 'Octavos de Final',
  'QUARTER_FINALS': 'Cuartos de Final',
  'SEMI_FINALS': 'Semifinal',
  'FINAL': 'Final'
};