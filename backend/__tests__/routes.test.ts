import app from '../app';
import request from 'supertest';


describe('Routes', () =>{

  let refresh_token: string;
  let access_token: string;
  let taskID: number;
  let userID : number;

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

  //describe the login user
  describe('POST  /login', ()=>{
    it('should login user successfully', async ()=>{
      const res = await request(app)
      .post('/login')
      .send({username: 'Kwadwo', password: 'asamoah24'});

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('token');
      refresh_token = res.headers['set-cookie'][0];
      access_token = res.body.data.token;
      userID = res.body.data.id;
    });
  });

 //describe the logout user
  describe('GET /logout', ()=>{
    it('should logout users successfully', async () =>{
      const res = await request(app)
      .get('/logout');

       expect(res.status).toBe(200);
       expect(res.body).toHaveProperty('message');
    });
  });

  //describe the getting refresh token
  describe('GET /refresh_token',()=>{
    it('should get refresh token', async () =>{
      const res = await request(app)
      .get('/refresh_token')
      .set('Cookie', refresh_token);

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('token');
    });
  });

//describe the fetching of tasks for a particular user
  describe('GET /tasks', () =>{
    it('should fetch all tasks successfully', async () =>{
      const res =  await request(app)
      .get(`/tasks/${userID}`)
      .set('Authorization', access_token);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
    });
  });

  //describe adding new tasks
  describe('POST /task', ()=>{
    it('should add user successfully', async () =>{
      const res = await request(app)
      .post('/tasks/task')
      .send({title: 'work', task: 'RGT', user_id: `${userID}`})
      .set('Authorization', access_token);

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('id');

      taskID = res.body.data.id;
    })
  })

//describe the fetching of a particular task
  describe('GET /task', ()=>{
    it('should fetch a particular task successfully', async () =>{
      const res = await request(app)
      .get(`/tasks/task/${taskID}?user=${userID}`)
      .set('Authorization', access_token);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');

    });
  });

  //describe update task
  describe('PUT /task', ()=>{
    it('should add user successfully', async () =>{
      const res = await request(app)
      .put(`/tasks/task/${taskID}`)
      .send({title: 'work', task: 'RGT', user_id: `${userID}`})
      .set('Authorization', access_token);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');

    });
  });

  //describe mark task as complete
  describe('PATCH /task/complete', () =>{
    it('should mark task as complete successfully', async ()=>{
      const res = await request(app)
      .patch(`/tasks/task/${taskID}/complete?user=${userID}`)
      .set('Authorization', access_token);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data')
    });
  });

  //describe mark task as undone
  describe('PATCH /task/unfinish', () =>{
    it('should mark task as complete successfully', async ()=>{
      const res = await request(app)
      .patch(`/tasks/task/${taskID}/unfinish?user=${userID}`)
      .set('Authorization', access_token);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data')
    });
  });

  //describe delete task
  describe('DELETE /task', ()=>{
    it('should delete a particular task successfully', async () =>{
      const res = await request(app)
      .delete(`/tasks/task/${taskID}?user=${userID}`)
      .set('Authorization', access_token);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');

    });
  });



});
