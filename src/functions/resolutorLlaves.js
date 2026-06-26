
const partidos16avos = [
    {
        hora: "28 jun, 14:00",
        home: "Sudáfrica",
        away: "Canadá"
    },
    {
        hora: "29 jun, 12:00",
        home: "Brasil",
        away: "2º Grupo F"
    },
    {
        hora: "29 jun, 15:30",
        home: "Alemania",
        away: "3º Grupo A/B/C/D/F"
    },
    {
        hora: "29 jun, 20:00",
        home: "1º Grupo F",
        away: "Marruecos"
    },
    {
        hora: "30 jun, 12:00",
        home: "Costa de Marfil",
        away: "2º Grupo I"
    },
    {
        hora: "30 jun, 16:00",
        home: "1º Grupo I",
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
        home: "1º Grupo G",
        away: "3º Grupo A/E/H/I/J"
    },
    {
        hora: "1 jul, 19:00",
        home: "EE.UU",
        away: "3º Grupo B/E/F/I/J"
    },
    {
        hora: "2 jul, 14:00",
        home: "1º Grupo H",
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
        home: "2º Grupo D",
        away: "2º Grupo G"
    },
    {
        hora: "3 jul, 17:00",
        home: "Argentina",
        away: "2º Grupo H"
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
