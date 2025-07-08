import { Router } from 'express';
import { tasksController } from '../controller/tasksController';

const router = Router();

router.get('/tasks', tasksController.getTaskList);
router.get('/tasks/:id', tasksController.getTaskItem);

export default router;
