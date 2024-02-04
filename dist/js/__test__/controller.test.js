"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_controller_1 = require("../controllers/task.controller");
jest.mock('../model/TaskModel', () => {
    return {
        // Mock static methods
        find: jest.fn(),
        findOne: jest.fn(),
        findOneAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
        countDocuments: jest.fn(),
        // Return a mock object from the constructor
        __esModule: true, // This property is needed when mocking a module with default export
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
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};
describe('Task Controller', () => {
    let req;
    let res;
    beforeEach(() => {
        req = {};
        res = mockResponse();
    });
    it('should create a task', () => __awaiter(void 0, void 0, void 0, function* () {
        req.body = {
            name: 'Test Task',
            description: 'This is a test',
            isDone: false,
            userId: 'user123',
            userName: 'testUser',
            email: 'test@example.com',
        };
        yield (0, task_controller_1.createTask)(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: 'Task added',
            task: expect.anything(),
        }));
    }));
    // Additional tests for getTasks, getTask, updateTask, toggleTaskCompletion, deleteTask
    // Follow the pattern above, adjusting req and mocking TaskModel methods as needed
});
