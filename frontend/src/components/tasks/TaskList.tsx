// src/components/TaskList.tsx
import React, { useEffect, useState } from 'react';

type Task = {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string
};

const Url = import.meta.env.VITE_API_URL;

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await fetch(`${Url}/tasks`);
                const data = await res.json();
                setTasks(data);
            } catch (err) {
                console.error('Error fetching tasks', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    if (loading) return <p className="text-center mt-10 text-gray-500">Cargando tareas...</p>;

    if (tasks.length === 0) return <p className="text-center mt-10 text-gray-400">No hay tareas todavía</p>;

    return (
        <div className="max-w-3xl mx-auto mt-10 px-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Lista de Tareas</h1>
            <ul className="space-y-4 mb-5">
                {tasks.map((task) => (
                    <li key={task.id} className="p-4 border rounded-lg shadow bg-white">
                        <h2 className="text-xl font-semibold">{task.title}</h2>
                        <p className="text-gray-600">{task.description}</p>
                        <p className={`text-sm mt-2 ${task.completed ? 'text-green-600' : 'text-red-600'}`}>
                            {task.completed ? 'Completada' : 'Pendiente'}
                        </p>
                        <p>{task.createdAt}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
