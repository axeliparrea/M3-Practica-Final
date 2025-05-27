import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Using Navbar.js instead of Navigation.js
import Home from './pages/Home';
import Login from './pages/LoginPage'; // Changed from Login to LoginPage
import Register from './pages/RegisterPage'; // Changed from Register to RegisterPage
import AppointmentDashboard from './pages/CitasPage'; // Changed from AppointmentDashboard to CitasPage

function App() {
  return (
    <Router>
      <Navbar /> {/* Changed from Navigation to Navbar */}
      <div className="container-fluid py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/appointments" element={<AppointmentDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;