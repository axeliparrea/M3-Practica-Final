const request = require('supertest');
const { poolPromise } = require('../config/db');
const server = require('../index');

// Asegúrate de que el servidor esté inicializado correctamente
beforeAll(() => {
  if (!server.listening) {
    server.listen(5000);
  }
});

describe('Auth Routes', () => {
  describe('POST /login', () => {
    it('debe devolver 200 para un inicio de sesión válido', async () => {
      const response = await request(server)
        .post('/login')
        .send({ correo: 'test@example.com', password: 'password123' });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    it('debe devolver 401 para un inicio de sesión inválido', async () => {
      const response = await request(server)
        .post('/login')
        .send({ correo: 'invalid@example.com', password: 'wrongpassword' });
      expect(response.status).toBe(401);
    });
  });

  describe('POST /register', () => {
    it('debe devolver 201 para un registro exitoso', async () => {
      const response = await request(server)
        .post('/register')
        .send({ correo: 'newuser@example.com', password: 'password123', nombre: 'New User' });
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'User registered successfully');
    });

    it('debe devolver 400 para campos faltantes', async () => {
      const response = await request(server)
        .post('/register')
        .send({ correo: 'newuser@example.com' });
      expect(response.status).toBe(400);
    });
  });

  afterAll(async () => {
    const pool = await poolPromise;
    await pool.close();
    server.close();
  });
});
