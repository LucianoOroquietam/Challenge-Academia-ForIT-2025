import { getAllTasks, getTaskById } from '../models/tasksModel';
import { RequestHandler } from 'express';

export const getTaskList: RequestHandler = async (_req, res) => {
    try {
        const tasks = await getAllTasks();
        if (tasks) {
            res.status(200).json(tasks);
        } else {
            res.status(200).json([]);
        }
    } catch (error) {
        console.error("Error al obtener tareas: ", error);
        res.status(500).json({
            error: "no se pudieron obtener las tareas"
        });
    }
}

export const getTaskItem: RequestHandler = async (_req, res) => {
    try {
        const id = Number(_req.params.id);

        if (isNaN(id) || id <= 0) {
            res.status(400).json({ message: "El id especificado no es válido" });
            return;
        }

        const task = await getTaskById(id);

        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ message: "Tarea no encontrada" });
        }
    } catch (error) {
        console.error("Error al obtener la tarea: ", error);
        res.status(500).json({
            error: "No se pudo obtener la tarea por id"
        });
    }
}

export const tasksController = {
    getTaskList,
    getTaskItem
};
