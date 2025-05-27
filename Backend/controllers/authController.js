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
    const isValid = await bcrypt.compare(contrasena, user.contrasena_hash);

    if (!isValid) {
      console.log("Invalid password");
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { 
        id: user.id, 
        rol: user.rol,
        nombre: user.nombre,
        correo: user.correo
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
        rol: user.rol
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Register Controller
exports.register = async (req, res) => {
  const { nombre, correo, contrasena, rol } = req.body;
  console.log("Register request:", { nombre, correo, rol });

  try {
    // Validate required fields
    if (!nombre || !correo || !contrasena || !rol) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const pool = await poolPromise;
    
    // Check if user exists
    const userCheck = await pool.request()
      .input('correo', sql.NVarChar, correo)
      .query('SELECT * FROM Usuarios WHERE correo = @correo');

    if (userCheck.recordset.length > 0) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Create new user
    const result = await pool.request()
      .input('nombre', sql.NVarChar, nombre)
      .input('correo', sql.NVarChar, correo)
      .input('contrasena_hash', sql.NVarChar, hashedPassword)
      .input('rol', sql.NVarChar, rol)
      .query(`
        INSERT INTO Usuarios (nombre, correo, contrasena_hash, rol) 
        OUTPUT INSERTED.id, INSERTED.nombre, INSERTED.correo, INSERTED.rol
        VALUES (@nombre, @correo, @contrasena_hash, @rol)
      `);

    const newUser = result.recordset[0];
    
    // Generate token for immediate login
    const token = jwt.sign(
      { 
        id: newUser.id, 
        rol: newUser.rol,
        nombre: newUser.nombre,
        correo: newUser.correo
      }, 
      JWT_SECRET, 
      { expiresIn: '1d' }
    );

    console.log("User registered successfully:", newUser.correo);
    res.status(201).json({ 
      message: 'Usuario registrado exitosamente',
      token,
      user: newUser
    });

  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

// Explicit exports
module.exports = {
  login: exports.login,
  register: exports.register
};