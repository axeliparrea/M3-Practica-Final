import React, { useEffect, useState } from 'react';
import api from '../services/api';

const CitasPage = () => {
  const [citas, setCitas] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ fecha: '', motivo: '', mascota_id: '' });
  const [selectedId, setSelectedId] = useState(null);

  const fetchCitas = async () => {
    const res = await api.get('/citas');
    setCitas(res.data);
  };

  const fetchMascotas = async () => {
    const res = await api.get('/mascotas');
    setMascotas(res.data);
  };

  useEffect(() => {
    fetchCitas();
    fetchMascotas();
  }, []);

  const handleOpen = () => {
    setEditMode(false);
    setFormData({ fecha: '', motivo: '', mascota_id: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const handleSubmit = async () => {
    if (!formData.mascota_id) return alert("Selecciona una mascota");
    if (editMode) {
      await api.put(`/citas/${selectedId}`, formData);
    } else {
      await api.post('/citas', formData);
    }
    fetchCitas();
    handleClose();
  };

  const handleEdit = (cita) => {
    setEditMode(true);
    setFormData({
      fecha: cita.fecha,
      motivo: cita.motivo,
      mascota_id: cita.mascota_id
    });
    setSelectedId(cita.id);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar esta cita?')) {
      await api.delete(`/citas/${id}`);
      fetchCitas();
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
        {citas.map((cita) => (
          <div className="col-12 col-md-6 col-lg-4" key={cita.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{new Date(cita.fecha).toLocaleString()}</h5>
                <p className="card-text">
                  <strong>Reason:</strong> {cita.motivo}<br/>
                  <strong>Pet ID:</strong> {cita.mascota_id}
                </p>
                <div className="d-flex justify-content-between mt-3">
                  <button 
                    className="btn btn-outline-primary" 
                    onClick={() => handleEdit(cita)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-outline-danger" 
                    onClick={() => handleDelete(cita.id)}
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
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Reason</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.motivo}
                    onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Pet</label>
                  <select
                    className="form-select"
                    value={formData.mascota_id}
                    onChange={(e) => setFormData({ ...formData, mascota_id: e.target.value })}
                  >
                    <option value="">Select a pet</option>
                    {mascotas.map((m) => (
                      <option key={m.id} value={m.id}>{m.nombre}</option>
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

export default CitasPage;