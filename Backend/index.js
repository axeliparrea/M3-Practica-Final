require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Configuración de middleware esencial
app.use(cors());
app.use(express.json());

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const mascotaRoutes = require('./routes/mascotaRoutes');
const citaRoutes = require('./routes/citaRoutes');

// Configurar rutas
app.use('/api/auth', authRoutes);
app.use('/api/mascotas', mascotaRoutes);
app.use('/api/citas', citaRoutes);

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint no encontrado' });
});

// Middleware de manejo de errores global
app.use((err, req, res, _next) => { // Renombrar next a _next para indicar que no se usa
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);

module.exports = app; // Asegúrate de exportar app para las pruebas