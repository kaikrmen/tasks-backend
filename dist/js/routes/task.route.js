"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("../controllers/task.controller");
const router = (0, express_1.Router)();
router.post('/task', task_controller_1.createTask);
router.get('/task', task_controller_1.getTasks);
router.get('/task/:id', task_controller_1.getTask);
router.put('/task/:id', task_controller_1.updateTask);
router.put('/task/:id/toggle', task_controller_1.toggleTaskCompletion);
router.delete('/task/:id', task_controller_1.deleteTask);
exports.default = router;
