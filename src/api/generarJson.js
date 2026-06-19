const fs = require('fs');

// El token vendrá de las variables de entorno de GitHub
const API_TOKEN = process.env.API_TOKEN; 
const API_URL = 'https://api.football-data.org/v4/competitions/WC/matches';

async function actualizarDatos() {
    console.log("Iniciando consulta a la API...");
    try {
        const response = await fetch(API_URL, {
            headers: { 'X-Auth-Token': API_TOKEN }
        });

        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const data = await response.json();
        
        // Guardamos el JSON
        fs.writeFileSync('partidos.json', JSON.stringify(data, null, 2));
        console.log("Archivo 'partidos.json' generado correctamente.");
    } catch (error) {
        console.error("Error crítico:", error);
        process.exit(1); // Esto ayuda a GitHub a saber que algo falló
    }
}

actualizarDatos();