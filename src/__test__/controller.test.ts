import { Request, Response } from 'express';
import * as TaskModel from '../model/TaskModel'; 
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  toggleTaskCompletion,
  deleteTask,
} from '../controllers/task.controller';
import { TaskInterface } from '../interfaces/TaskInterface';
import mongoose from 'mongoose';

interface TaskModelTest extends mongoose.Model<mongoose.Document> {
    find: jest.Mock;
    findOne: jest.Mock;
    findOneAndUpdate: jest.Mock;
    findByIdAndDelete: jest.Mock;
    countDocuments: jest.Mock;
    save: jest.Mock;
  }

  const MockedTaskModel = TaskModel as unknown as TaskModelTest;
  
  jest.mock('../model/TaskModel', () => ({
    __esModule: true,
    default: {
      find: jest.fn().mockReturnThis(),
      findOne: jest.fn().mockReturnThis(),
      findOneAndUpdate: jest.fn().mockReturnThis(),
      findByIdAndDelete: jest.fn().mockReturnThis(),
      countDocuments: jest.fn(),
      save: jest.fn(),
    },
  }));
jest.mock('../model/TaskModel', () => {
    return {
      find: jest.fn(),
      findOne: jest.fn(),
      findOneAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
      countDocuments: jest.fn(),
      __esModule: true,
      default: jest.fn().mockImplementation(() => ({
        save: jest.fn().mockResolvedValue({
          name: 'Test Task',
          description: 'This is a test',
          isDone: false,
          userId: 'user123',
          userName: 'testUser',
          email: 'test@example.com',
        }),
      })),
    };
  });

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe('Task Controller', () => {
  let req: Partial<Request>;
  let res: Response;

  beforeEach(() => {
    req = {}; 
    res = mockResponse(); 
  });

  it('should create a task', async () => {
    req.body = {
      name: 'Test Task',
      description: 'This is a test',
      isDone: false,
      userId: 'user123',
      userName: 'testUser',
      email: 'test@example.com',
    };
  
    await createTask(req as Request, res);
  
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Task added',
      task: expect.anything(),
    }));
  });

 
});

