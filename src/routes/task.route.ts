import { Router } from 'express';
import { createTask, getTasks, getTask, updateTask, toggleTaskCompletion, deleteTask } from '../controllers/task.controller';
const router = Router();

router.post('/task', createTask);
router.get('/task', getTasks);
router.get('/task/:id', getTask);
router.put('/task/:id', updateTask);
router.put('/task/:id/toggle', toggleTaskCompletion);
router.delete('/task/:id', deleteTask);

export default router;