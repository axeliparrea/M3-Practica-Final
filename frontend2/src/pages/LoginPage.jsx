import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const { data } = await axios.post('http://localhost:5000/auth/login', { 
        correo: email,
        contrasena: password
      });
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Redirección basada en el rol (ahora usando 'rol' en lugar de 'role')
      if (data.user.rol === 'cliente') {
        navigate('/appointments');
      } else {
        navigate('/citas-vet'); // Para 'veterinario' y cualquier otro rol
      }
      
    } catch (err) {
      setError(err.response?.data?.error || 'Credenciales inválidas');
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3">
      <div className="card shadow-lg border-0 rounded-4" style={{ maxWidth: '450px', width: '100%' }}>
        <div className="card-body p-5">
          <h2 className="text-center mb-4 fw-bold text-primary">
            <i className="fas fa-sign-in-alt me-2"></i>
            Iniciar sesión
          </h2>
          {error && (
            <div className="alert alert-danger text-center">
              <i className="fas fa-exclamation-circle me-2"></i>
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="form-floating">
                <input
                  type="email"
                  className="form-control rounded-3"
                  id="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="email">Correo electrónico</label>
              </div>
            </div>
            <div className="mb-4">
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control rounded-3"
                  id="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="password">Contraseña</label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold rounded-3">
              <i className="fas fa-sign-in-alt me-2"></i>
              Iniciar sesión
            </button>
          </form>
          <div className="text-center mt-4">
            <Link to="/register" className="text-decoration-none text-secondary">
              <i className="fas fa-user-plus me-2"></i>
              ¿No tienes una cuenta? <span className="text-primary">Regístrate aquí</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;