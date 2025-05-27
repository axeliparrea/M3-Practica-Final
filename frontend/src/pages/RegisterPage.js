import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, TextField, Button, Typography, Paper, MenuItem, Alert
} from '@mui/material';
import { authService } from '../services/api';

const RegisterPage = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [rol, setRol] = useState('cliente');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');
    
    try {
      const response = await authService.register({ 
        nombre, 
        correo, 
        contrasena, 
        rol 
      });
      
      setMensaje('Usuario registrado. Redirigiendo...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrar usuario');
      console.error('Registration error:', err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" gutterBottom>Registro</Typography>
        <form onSubmit={handleRegister}>
          <TextField label="Nombre" fullWidth margin="normal" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          <TextField label="Correo" type="email" fullWidth margin="normal" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
          <TextField label="Contraseña" type="password" fullWidth margin="normal" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
          <TextField
            select
            label="Rol"
            fullWidth
            margin="normal"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          >
            <MenuItem value="cliente">Cliente</MenuItem>
            <MenuItem value="veterinario">Veterinario</MenuItem>
          </TextField>
          <Button variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>Registrarse</Button>
        </form>
        {mensaje && <Alert severity="success" sx={{ mt: 2 }}>{mensaje}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Paper>
    </Container>
  );
};

export default RegisterPage;