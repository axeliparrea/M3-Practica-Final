import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const LoginPage = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Resetear el error al intentar nuevamente
    
    try {
      const res = await api.post('/auth/login', { 
        correo, 
        contrasena 
      });
      
      // Almacenar token y datos del usuario
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      // Redirigir según el rol del usuario
      const redirectPath = res.data.user.rol === 'admin' 
        ? '/admin/dashboard' 
        : '/dashboard/appointments';
      
      navigate(redirectPath);
      
    } catch (err) {
      console.error('Error de login:', err.response?.data);
      setError(err.response?.data?.error || 'Credenciales inválidas');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg border-0">
            <div className="card-body p-5">
              <h2 className="text-center mb-4 fw-bold">
                <i className="fas fa-sign-in-alt me-2"></i>
                Iniciar Sesión
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="correo"
                      placeholder="Correo electrónico"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      required
                    />
                    <label htmlFor="correo">Correo electrónico</label>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="contrasena"
                      placeholder="Contraseña"
                      value={contrasena}
                      onChange={(e) => setContrasena(e.target.value)}
                      required
                    />
                    <label htmlFor="contrasena">Contraseña</label>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100 py-2 mb-4 fw-bold">
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Iniciar Sesión
                </button>
                {error && (
                  <div className="alert alert-danger text-center mb-4">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {error}
                  </div>
                )}
                <div className="text-center">
                  <Link to="/register" className="text-decoration-none">
                    <i className="fas fa-user-plus me-2"></i>
                    ¿No tienes una cuenta? Regístrate aquí
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;