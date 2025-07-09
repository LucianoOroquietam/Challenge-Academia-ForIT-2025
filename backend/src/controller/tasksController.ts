import { getAllTasks, getTaskById, insertTask, updateTask, deleteTaskById } from '../models/tasksModel';
import { RequestHandler } from 'express';
import { validateTask } from '../helpers/task-validator';
import { validationError } from '../helpers/error-validator';

export const getTaskList: RequestHandler = async (_req, res) => {
    try {
        const allTasks = await getAllTasks();
        if (allTasks) {
            res.status(200).json(allTasks);
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

        const taskById = await getTaskById(id);

        if (taskById) {
            res.status(200).json(taskById);
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

export const createTask: RequestHandler = async (_req, res) => {
    try {
        const { title, description, completed } = _req.body
        validateTask({ title, description, completed, createdAt: new Date().toISOString() });

        const taskData = await insertTask(
            title,
            description,
            Boolean(completed),
            new Date()
        );

        if (taskData) {
            res.status(201).json(taskData);
        }

    } catch (error: any) {
        console.error('Error al crear la tarea:', error);
        //para las excepciones de validator
        if (validationError(error, res)) return;
        res.status(500).json({ message: "Error interno del servidor" });

    }
}
export const editTask: RequestHandler = async (_req, res) => {
    try {
        const id = Number(_req.params.id);
        const { title, description, completed } = _req.body;

        const taskData = {
            id,
            title,
            description,
            completed: Boolean(completed),
        };

        validateTask(taskData);

        const taskEdit = await updateTask(id, title, description, Boolean(completed));

        if (taskEdit) {
            res.status(200).json(taskEdit);
        } else {
            res.status(404).json({ message: "Tarea no encontrada" });
        }
    } catch (error: any) {
        if (validationError(error, res)) return;
        res.status(500).json({ message: "Error interno del servidor" });
    }
};


export const deleteTask: RequestHandler = async (_req, res) => {
    try {
        const id = Number(_req.params.id);
        if (isNaN(id) || id <= 0) {
            res.status(400).json({ message: "El id especificado no es válido" });
            return;
        }
        const deleted = await deleteTaskById(id);
        if (deleted) {
            res.status(200).json({ message: "Tarea eliminada correctamente" });
        } else {
            res.status(404).json({ message: "Tarea no encontrada" });
        }
    } catch (error) {
        console.error("Error al eliminar la tarea: ", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}



export const tasksController = {
    getTaskList,
    getTaskItem,
    createTask,
    editTask,
    deleteTask
};
