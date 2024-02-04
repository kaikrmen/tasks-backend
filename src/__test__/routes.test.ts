import request from 'supertest';
import express from 'express';
import taskRouter from './../routes/task.route';
import * as taskController from '../controllers/task.controller'; 

jest.mock('../controllers/task.controller', () => ({
  createTask: jest.fn((req, res) => res.status(201).send({})),
  getTasks: jest.fn((req, res) => res.status(200).send([])),
  getTask: jest.fn((req, res) => res.status(200).send({})),
  updateTask: jest.fn((req, res) => res.status(200).send({})),
  toggleTaskCompletion: jest.fn((req, res) => res.status(200).send({})),
  deleteTask: jest.fn((req, res) => res.status(204).send({})),
}));

describe('Task Router', () => {
  const app = express();
  app.use(express.json());
  app.use('/api/tasks', taskRouter);

  it('POST /task should create a task', async () => {
    const response = await request(app).post('/api/tasks/task').send({
      name: 'Test Task',
      description: 'Test Description',
    });
    expect(response.statusCode).toBe(201);
    expect(taskController.createTask).toHaveBeenCalled();
  });

  it('GET /task should return all tasks', async () => {
    const response = await request(app).get('/api/tasks/task');
    expect(response.statusCode).toBe(200);
    expect(taskController.getTasks).toHaveBeenCalled();
  });

});
