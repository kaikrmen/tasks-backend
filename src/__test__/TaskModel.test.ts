import mongoose from 'mongoose';
import TaskModel from './../model/TaskModel'; 
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('TaskModel', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('should create a task', async () => {
    const task = new TaskModel({
      name: 'Test Task',
      description: 'Test Description',
      isDone: false,
      userId: '123',
      userName: 'Test User',
      email: 'test@example.com'
    });

    const savedTask = await task.save();

    expect(savedTask).toMatchObject({
        name: 'Test Task',
        description: 'Test Description',
        isDone: false,
        userId: '123',
        userName: 'Test User',
        email: 'test@example.com'
    });

    expect(savedTask.get('createdAt')).toBeDefined();
    expect(savedTask.get('updatedAt')).toBeDefined();
  });

});
