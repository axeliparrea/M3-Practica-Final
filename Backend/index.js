require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Configuración de middleware esencial
app.use(cors());
app.use(express.json()); // Este middleware es CRUCIAL para parsear JSON

// Importar rutas
const authRoutes = require('./routes/authRoutes');

// Configurar rutas
app.use('/auth', authRoutes);

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint no encontrado' });
});


// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));