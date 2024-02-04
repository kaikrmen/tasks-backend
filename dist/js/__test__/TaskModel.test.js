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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TaskModel_1 = __importDefault(require("./../model/TaskModel"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
describe('TaskModel', () => {
    let mongoServer;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        yield mongoose_1.default.connect(uri);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongoServer.stop();
    }));
    it('should create a task', () => __awaiter(void 0, void 0, void 0, function* () {
        const task = new TaskModel_1.default({
            name: 'Test Task',
            description: 'Test Description',
            isDone: false,
            userId: '123',
            userName: 'Test User',
            email: 'test@example.com'
        });
        const savedTask = yield task.save();
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
    }));
});
