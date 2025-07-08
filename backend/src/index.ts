import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/tasks-route'; 

const app = express();

app.use(cors());
app.use(express.json());

// armado de ruta
app.use('/api', taskRoutes); 

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});
