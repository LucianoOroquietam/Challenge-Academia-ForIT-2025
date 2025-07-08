import express, { Request, Response } from 'express';
import { getAllTasks, dropTasksTable } from './models/tasksModel' 

const app = express();
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('API funcionando');
});

app.get('/tasks', async (_req: Request, res: Response) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
});

app.delete('/tasks/drop', async (_req, res) => {
  try {
    await dropTasksTable();
    res.json({ message: 'Tabla tasks eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la tabla' });
  }
});


app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});
