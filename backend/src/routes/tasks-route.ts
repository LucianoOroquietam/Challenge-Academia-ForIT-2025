import { Router } from 'express';
import { tasksController } from '../controller/tasksController';

const router = Router();

router.get('/tasks', tasksController.getTaskList);
router.get('/tasks/:id', tasksController.getTaskItem);
router.post('/tasks', tasksController.createTask);
router.put('/tasks/:id', tasksController.editTask);
router.delete('/tasks/:id', tasksController.deleteTask)

export default router;
