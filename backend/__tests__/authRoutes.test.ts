import app from '../app';
import request from 'supertest';


describe('AuthRoutes', () =>{

  let refresh_token: string;

  //describe register user
  describe('POST /register', () =>{
    it('should register new users', async () =>{
      const res = await request(app)
      .post('/register')
      .send({username:'Kwadwo', password: 'asamoah24'});

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
    });
  });

  describe('POST  /login', ()=>{
    it('should login user successfully', async ()=>{
      const res = await request(app)
      .post('/login')
      .send({username: 'Kwadwo', password: 'asamoah24'});

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('token');
      refresh_token = res.headers['set-cookie'][0];
    });
  });

  describe('GET /logout', ()=>{
    it('should logout users successfully', async () =>{
      const res = await request(app)
      .get('/logout');

       expect(res.status).toBe(200);
       expect(res.body).toHaveProperty('message');
    });
  });

  describe('GET /refresh_token',()=>{
    it('should get refresh token', async () =>{
      const res = await request(app)
      .get('/refresh_token')
      .set('Cookie', refresh_token);

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('token');
    });
  });

});
