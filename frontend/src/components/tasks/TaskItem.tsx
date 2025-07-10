import { useEffect, useState } from 'react'
import type { Task } from '../../interface/Task';
import { useParams, Link } from 'react-router-dom';

const Url = import.meta.env.VITE_API_URL;

const TaskItem = () => {
    const { id } = useParams();
    const [task, setTask] = useState<Task | null>(null);



    useEffect(() => {
        const fetchTaskById = async () => {
            try {
                const res = await fetch(`${Url}/tasks/${id}`);
                const data = await res.json();
                setTask(data);
            } catch (err) {
                console.error('Error al fetch de tareas por id', err);
            }
        }
        fetchTaskById();
    }, [id]);


    if (!task) return <p className='text-center mt-10 text-gray-500'>No hayTareas...</p>;

    return (
        <div className="p-4 border rounded-lg shadow bg-white max-w-xl mx-auto mt-10">
            <h2 className="text-gray-900 text-2xl font-bold">{task.title}</h2>
            <p className="text-gray-900">{task.description}</p>
            <p className={`mt-2 ${task.completed ? 'text-green-600' : 'text-red-600'}`}>
                Estado: {task.completed ? 'Completada' : 'Pendiente'}
            </p>
            <p className="text-sm text-gray-500">
                {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : 'Sin fecha'}
            </p>
            <div className="flex gap-2">
                <Link
                    to={`/TaskForm/${task.id}`}
                    className="bg-gray-900 text-white rounded-sm p-2 mt-2 inline-block text-center"
                >
                    Editar Tarea
                </Link>

                <Link
                    to={`/TaskDelete/${task.id}`}
                    className="bg-gray-900 text-white rounded-sm p-2 mt-2 inline-block text-center"
                >
                    Eliminar Tarea
                </Link>
            </div>

        </div>

    )
}

export default TaskItem
