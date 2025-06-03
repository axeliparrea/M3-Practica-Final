import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [rol, setRol] = useState('cliente');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();


  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');
    setCargando(true);

    try {
      await axios.post('http://localhost:5000/auth/register', {
        nombre,
        correo,
        contrasena,
        rol
      });

      setMensaje('Usuario registrado. Redirigiendo...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Error en el registro');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4 p-md-5">
              <h2 className="text-center mb-4 fw-bold text-primary">
                Crear Cuenta
              </h2>
              
              <form onSubmit={handleRegister} className="px-2 px-md-3">
                <div className="mb-3">
                  <label className="form-label fw-medium">Nombre Completo</label>
                  <input
                    type="text"
                    className="form-control py-2 rounded-3"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-medium">Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control py-2 rounded-3"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-medium">Contraseña</label>
                  <input
                    type="password"
                    className="form-control py-2 rounded-3"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-medium">Tipo de Cuenta</label>
                  <select
                    className="form-select py-2 rounded-3"
                    value={rol}
                    onChange={(e) => setRol(e.target.value)}
                  >
                    <option value="cliente">Cliente</option>
                    <option value="veterinario">Veterinario</option>
                  </select>
                </div>

                {mensaje && (
                  <div className="alert alert-success text-center mb-4 rounded-3">
                    {mensaje}
                  </div>
                )}
                {error && (
                  <div className="alert alert-danger text-center mb-4 rounded-3">
                    {error}
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn btn-primary w-100 py-2 mb-3 fw-bold rounded-3"
                  disabled={cargando}
                >
                  {cargando ? 'Registrando...' : 'Registrarse'}
                </button>

                <div className="text-center mt-4 pt-2">
                  <p className="text-muted">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" className="text-primary fw-medium text-decoration-none">
                      Inicia Sesión
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;