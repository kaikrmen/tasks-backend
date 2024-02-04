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
exports.deleteTask = exports.toggleTaskCompletion = exports.updateTask = exports.getTask = exports.getTasks = exports.createTask = void 0;
const TaskModel_1 = __importDefault(require("./../model/TaskModel"));
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        if (!body.userId) {
            return res.status(400).json({ message: 'userId is required' });
        }
        if (!body.name || !body.description) {
            return res.status(400).json({ message: 'Fields are required' });
        }
        const task = new TaskModel_1.default({
            name: body.name,
            description: body.description,
            isDone: body.isDone || false,
            userId: body.userId,
            userName: body.userName,
            email: body.email
        });
        const newTask = yield task.save();
        res.status(201).json({ message: 'Task added', task: newTask });
    }
    catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Error while creating the task' });
    }
});
exports.createTask = createTask;
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.userId;
        const page = parseInt(req.query.page, 10) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        if (!userId) {
            return res.status(400).json({ message: 'userId is required' });
        }
        const tasks = yield TaskModel_1.default.find({ userId: userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        if (!tasks) {
            return res.status(404).json({ message: 'User has no tasks' });
        }
        const totalTasks = yield TaskModel_1.default.countDocuments({ userId: userId });
        res.status(200).json({
            tasks: tasks,
            currentPage: page,
            totalPages: Math.ceil(totalTasks / limit),
            totalTasks: totalTasks
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while retrieving the tasks' });
    }
});
exports.getTasks = getTasks;
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.query;
        const { id: taskId } = req.params;
        if (!userId) {
            return res.status(400).json({ message: 'userId is required' });
        }
        if (!taskId) {
            return res.status(400).json({ message: 'Task ID is required' });
        }
        const task = yield TaskModel_1.default.findOne({ _id: taskId, userId: userId });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while retrieving the task' });
    }
});
exports.getTask = getTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const userId = req.query.userId;
        const updates = req.body;
        if (!taskId) {
            return res.status(400).json({ message: 'Task ID is required' });
        }
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const allowedUpdates = ['name', 'description'];
        const actualUpdates = Object.keys(updates)
            .filter(key => allowedUpdates.includes(key) && updates[key] !== null)
            .reduce((acc, key) => (Object.assign(Object.assign({}, acc), { [key]: updates[key] })), {});
        if (Object.keys(actualUpdates).length === 0) {
            return res.status(400).json({ message: 'No valid updates provided' });
        }
        const task = yield TaskModel_1.default.findOneAndUpdate({ _id: taskId, userId: userId }, actualUpdates, { new: true });
        if (!task) {
            return res.status(404).json({ message: 'Task not found or user not authorized' });
        }
        res.status(200).json({ message: 'Task updated successfully', task });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while updating the task' });
    }
});
exports.updateTask = updateTask;
const toggleTaskCompletion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const userId = req.query.userId;
        if (!taskId) {
            return res.status(400).json({ message: 'Task ID is required' });
        }
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const task = yield TaskModel_1.default.findOne({ _id: taskId, userId: userId });
        if (!task) {
            return res.status(404).json({ message: 'Task not found or user not authorized' });
        }
        task.isDone = !task.isDone;
        const updatedTask = yield task.save();
        res.status(200).json(updatedTask);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while toggling the task completion status' });
    }
});
exports.toggleTaskCompletion = toggleTaskCompletion;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const userId = req.query.userId; // Asume que el userId se envía como un parámetro de query
        if (!taskId) {
            return res.status(400).json({ message: 'Task ID is required' });
        }
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const task = yield TaskModel_1.default.findOne({ _id: taskId, userId: userId });
        if (!task) {
            return res.status(404).json({ message: 'Task not found or user not authorized to delete' });
        }
        yield TaskModel_1.default.findByIdAndDelete(taskId);
        res.status(200).json({ message: 'Task deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while deleting the task' });
    }
});
exports.deleteTask = deleteTask;
