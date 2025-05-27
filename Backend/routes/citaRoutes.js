
const express = require('express');
const router = express.Router();
const { getCitas, crearCita, editarCita, eliminarCita } = require('../controllers/citaController');
// citaRoutes.js
const verifyToken = require('../middleware/authMiddleware'); 

router.get('/citas', verifyToken, getCitas);
router.post('/citas', verifyToken, crearCita);
router.put('/citas/:id', verifyToken, editarCita);
router.delete('/citas/:id', verifyToken, eliminarCita);

module.exports = router;
