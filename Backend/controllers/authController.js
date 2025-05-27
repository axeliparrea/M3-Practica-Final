const { poolPromise, sql } = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// Login Controller
exports.login = async (req, res) => {
  const { correo, contrasena } = req.body;
  console.log("Login request:", correo);

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('correo', sql.NVarChar, correo)
      .query('SELECT * FROM Usuarios WHERE correo = @correo');

    if (result.recordset.length === 0) {
      console.log("User not found");
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const user = result.recordset[0];
    
    // Verificar si el usuario tiene contraseña hash
    if (!user.contrasena_hash) {
      console.log("User has no password set");
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const isValid = await bcrypt.compare(contrasena, user.contrasena_hash);

    if (!isValid) {
      console.log("Invalid password");
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { 
        id: user.id, 
        rol: user.rol || 'cliente', // Default role si no está definido
        nombre: user.nombre,
        correo: user.correo,
        fecha_registro: user.fecha_registro
      }, 
      JWT_SECRET, 
      { expiresIn: '1d' }
    );

    console.log("Login successful for user:", user.correo);
    res.json({ 
      token, 
      user: {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
        rol: user.rol || 'cliente',
        fecha_registro: user.fecha_registro
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ 
      error: 'Error en el servidor',
      details: process.env.NODE_ENV === 'development' ? err.message : null
    });
  }
};

// Register Controller
exports.register = async (req, res) => {
  const { nombre, correo, contrasena, rol } = req.body;
  
  // Validación básica
  if (!nombre || !correo || !contrasena) {
    return res.status(400).json({ 
      error: 'Campos requeridos faltantes',
      required: ['nombre', 'correo', 'contrasena']
    });
  }

  try {
    const pool = await poolPromise;
    
    // Verificar si el correo ya existe
    const emailCheck = await pool.request()
      .input('correo', sql.NVarChar, correo)
      .query('SELECT id FROM Usuarios WHERE correo = @correo');
    
    if (emailCheck.recordset.length > 0) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);
    
    // Crear nuevo usuario
    const result = await pool.request()
      .input('nombre', sql.NVarChar, nombre)
      .input('correo', sql.NVarChar, correo)
      .input('contrasena_hash', sql.NVarChar, hashedPassword)
      .input('rol', sql.NVarChar, rol || 'cliente') // Rol por defecto
      .query(`
        INSERT INTO Usuarios 
        (nombre, correo, contrasena_hash, rol, fecha_registro) 
        OUTPUT INSERTED.id, INSERTED.nombre, INSERTED.correo, INSERTED.rol, INSERTED.fecha_registro
        VALUES (@nombre, @correo, @contrasena_hash, @rol, GETDATE())
      `);

    const newUser = result.recordset[0];
    
    const token = jwt.sign(
      { 
        id: newUser.id,
        rol: newUser.rol,
        nombre: newUser.nombre,
        correo: newUser.correo,
        fecha_registro: newUser.fecha_registro
      }, 
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: newUser
    });

  } catch (err) {
    console.error("Registration error:", {
      message: err.message,
      stack: err.stack,
      sqlError: err.originalError?.info?.message
    });
    
    res.status(500).json({ 
      error: 'Error al registrar usuario',
      details: process.env.NODE_ENV === 'development' ? err.message : null
    });
  }
};

module.exports = {
  login: exports.login,
  register: exports.register
};