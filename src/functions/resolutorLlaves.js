
const partidos16avos = [
    {
        hora: "28 jun, 14:00",
        home: "Sudáfrica",
        away: "Canadá"
    },
    {
        hora: "29 jun, 12:00",
        home: "Brasil",
        away: "Japon"
    },
    {
        hora: "29 jun, 15:30",
        home: "Alemania",
        away: "3º Grupo A/B/C/D/F"
    },
    {
        hora: "29 jun, 20:00",
        home: "Paises bajos",
        away: "Marruecos"
    },
    {
        hora: "30 jun, 12:00",
        home: "Costa de Marfil",
        away: "Noruega"
    },
    {
        hora: "30 jun, 16:00",
        home: "Francia",
        away: "3º Grupo C/D/F/G/H"
    },
    {
        hora: "30 jun, 20:00",
        home: "México",
        away: "3º Grupo A/E/H/I/J"
    },
    {
        hora: "1 jul, 11:00",
        home: "1º Grupo L",
        away: "3º Grupo E/H/I/J/K"
    },
    {
        hora: "1 jul, 15:00",
        home: "Belgica",
        away: "3º Grupo A/E/H/I/J"
    },
    {
        hora: "1 jul, 19:00",
        home: "EE.UU",
        away: "3º Grupo B/E/F/I/J"
    },
    {
        hora: "2 jul, 14:00",
        home: "España",
        away: "2º Grupo J"
    },
    {
        hora: "2 jul, 18:00",
        home: "2º Grupo K",
        away: "2º Grupo L"
    },
    {
        hora: "2 jul, 22:00",
        home: "Suiza",
        away: "3º Grupo E/F/G/I/J"
    },
    {
        hora: "3 jul, 13:00",
        home: "Australia",
        away: "Egipto"
    },
    {
        hora: "3 jul, 17:00",
        home: "Argentina",
        away: "Cabo verde"
    },
    {
        hora: "3 jul, 20:30",
        home: "1º Grupo K",
        away: "3º Grupo D/E/I/J/L"
    }
];

export const resolverNombreFinales = (fecha, type)  => {

    const partido = partidos16avos.find(
        partido => partido.hora === fecha
    );

    if (!partido) {
        return "Por definir";
    }

    return partido[type];
};
