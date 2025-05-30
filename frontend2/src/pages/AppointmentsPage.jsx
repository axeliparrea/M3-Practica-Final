import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [pets, setPets] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ date: '', reason: '', pet_id: '' });
  const [selectedId, setSelectedId] = useState(null);

  const fetchAppointments = async () => {
    const { data } = await axios.get('/api/appointments');
    setAppointments(data);
  };

  const fetchPets = async () => {
    const { data } = await axios.get('/api/pets');
    setPets(data);
  };

  useEffect(() => {
    fetchAppointments();
    fetchPets();
  }, []);

  const handleOpen = () => {
    setEditMode(false);
    setFormData({ date: '', reason: '', pet_id: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const handleSubmit = async () => {
    if (!formData.pet_id) return alert("Select a pet");
    if (editMode) {
      await axios.put(`/api/appointments/${selectedId}`, formData);
    } else {
      await axios.post('/api/appointments', formData);
    }
    fetchAppointments();
    handleClose();
  };

  const handleEdit = (appointment) => {
    setEditMode(true);
    setFormData({
      date: appointment.date,
      reason: appointment.reason,
      pet_id: appointment.pet_id
    });
    setSelectedId(appointment.id);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this appointment?')) {
      await axios.delete(`/api/appointments/${id}`);
      fetchAppointments();
    }
  };

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col d-flex justify-content-between align-items-center">
          <h2>Appointments</h2>
          <button className="btn btn-primary" onClick={handleOpen}>
            + New Appointment
          </button>
        </div>
      </div>
      
      <div className="row g-4">
        {appointments.map((appointment) => (
          <div className="col-12 col-md-6 col-lg-4" key={appointment.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{new Date(appointment.date).toLocaleString()}</h5>
                <p className="card-text">
                  <strong>Reason:</strong> {appointment.reason}<br/>
                  <strong>Pet:</strong> {pets.find(p => p.id === appointment.pet_id)?.name || 'Unknown'}
                </p>
                <div className="d-flex justify-content-between mt-3">
                  <button 
                    className="btn btn-outline-primary" 
                    onClick={() => handleEdit(appointment)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-outline-danger" 
                    onClick={() => handleDelete(appointment.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Create/Edit */}
      <div className={`modal fade ${open ? 'show' : ''}`} 
           style={{display: open ? 'block' : 'none'}}
           tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {editMode ? 'Edit Appointment' : 'New Appointment'}
              </h5>
              <button type="button" className="btn-close" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Date and Time</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Reason</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Pet</label>
                  <select
                    className="form-select"
                    value={formData.pet_id}
                    onChange={(e) => setFormData({ ...formData, pet_id: e.target.value })}
                  >
                    <option value="">Select a pet</option>
                    {pets.map((pet) => (
                      <option key={pet.id} value={pet.id}>{pet.name}</option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {open && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default AppointmentsPage;