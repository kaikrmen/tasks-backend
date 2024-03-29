"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const task_route_1 = __importDefault(require("./../routes/task.route"));
const taskController = __importStar(require("../controllers/task.controller"));
jest.mock('../controllers/task.controller', () => ({
    createTask: jest.fn((req, res) => res.status(201).send({})),
    getTasks: jest.fn((req, res) => res.status(200).send([])),
    getTask: jest.fn((req, res) => res.status(200).send({})),
    updateTask: jest.fn((req, res) => res.status(200).send({})),
    toggleTaskCompletion: jest.fn((req, res) => res.status(200).send({})),
    deleteTask: jest.fn((req, res) => res.status(204).send({})),
}));
describe('Task Router', () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use('/api/tasks', task_route_1.default);
    it('POST /task should create a task', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post('/api/tasks/task').send({
            name: 'Test Task',
            description: 'Test Description',
        });
        expect(response.statusCode).toBe(201);
        expect(taskController.createTask).toHaveBeenCalled();
    }));
    it('GET /task should return all tasks', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/api/tasks/task');
        expect(response.statusCode).toBe(200);
        expect(taskController.getTasks).toHaveBeenCalled();
    }));
    // Add tests for each route following the pattern above
});
