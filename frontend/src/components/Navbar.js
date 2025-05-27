import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="fas fa-clinic-medical me-2"></i>
          VetCare Pro
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link d-flex align-items-center" to="/dashboard/appointments">
                    <i className="fas fa-calendar-alt me-2"></i>
                    Appointments
                  </Link>
                </li>
                {role === 'veterinarian' && (
                  <li className="nav-item">
                    <Link className="nav-link d-flex align-items-center" to="/dashboard/pets">
                      <i className="fas fa-paw me-2"></i>
                      Pets
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link className="nav-link d-flex align-items-center" to="/profile">
                    <i className="fas fa-user me-2"></i>
                    Profile
                  </Link>
                </li>
              </>
            )}
          </ul>
          {token ? (
            <button 
              className="btn btn-light d-flex align-items-center" 
              onClick={handleLogout}
            >
              <i className="fas fa-sign-out-alt me-2"></i>
              Logout
            </button>
          ) : (
            <div className="d-flex gap-2">
              <Link className="btn btn-light d-flex align-items-center" to="/login">
                <i className="fas fa-sign-in-alt me-2"></i>
                Login
              </Link>
              <Link className="btn btn-outline-light d-flex align-items-center" to="/register">
                <i className="fas fa-user-plus me-2"></i>
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;