const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;

app.use(express.json());
const allowedOrigins = [
    'http://localhost:3000',
    'http://172.25.48.1:8080'
];

app.use(cors({
    origin: function (origin, callback) {
        // Permitir solicitudes sin origen (como Postman) o si está en la lista
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    credentials: true
}));

// ✅ Carga de rutas
const usuarioRutas = require('./routes/usuario/usuario.rutas');
const loginRutas = require('./routes/login/login.rutas');
const seguroRutas = require('./routes/seguro/seguro.rutas');
const coberturaRouter = require('./routes/cobertura/cobertura.rutas');
const beneficioRouter = require('./routes/beneficio/beneficio.rutas');
const requisitoRouter = require('./routes/requisito/requisito.rutas');
const contratoRouter = require('./routes/contrato/contrato.rutas');





app.use('/usuario', usuarioRutas);
app.use('/login', loginRutas);
app.use('/seguros', seguroRutas);
app.use('/cobertura', coberturaRouter);
app.use('/beneficio', beneficioRouter);
app.use('/requisito', requisitoRouter);
app.use('/contratos', contratoRouter);

// Ruta base
app.get("/", (req, res) => {
    res.send("API en línea");
});

app.listen(PORT, () => {
    console.log(`Servidor Express en http://localhost:${PORT}`);
});
