import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import type { Task } from '../../interface/Task';

const TaskDelete = () => {
    const Url = import.meta.env.VITE_API_URL;
    const { id } = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState<Task | null>(null);
    const [successMessage, setSuccessMessage] = useState('');

    // traer la tarea por ID
    useEffect(() => {
        if (id) {
            const fetchTask = async () => {
                try {
                    const res = await fetch(`${Url}/${id}`);
                    const data = await res.json();
                    setTask(data);
                } catch (error) {
                    console.error('Error al obtener la tarea:', error);
                }
            };
            fetchTask();
        }
    }, [id]);

    // aca eliminamos la tarea
    const handleDelete = async () => {
        try {
            const res = await fetch(`${Url}/tasks/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setSuccessMessage('La tarea fue eliminada exitosamente');

                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } else {
                console.error('Error al eliminar la tarea');
            }
        } catch (error) {
            console.error('Error en la petición DELETE:', error);
        }
    };

    return (
        <div className="p-6 text-center">
            {successMessage ? (
                <p className="text-green-500 font-semibold text-center bg-gray-900 p-2 w-1/2 mx-auto rounded">{successMessage}</p>
            ) : (
                <>
                    <h2 className="text-xl font-bold mb-4">
                        ¿Estas seguro que queres eliminar esta tarea?
                    </h2>
                    {task && (
                        <p className="mb-4">
                            Título: <span className="font-medium">{task.title}</span>
                        </p>
                    )}

                    <div className="flex justify-center gap-4 ">
                        <button
                            onClick={handleDelete}
                            className="cursor-pointer bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            Confirmar Eliminacion
                        </button>

                        <Link
                            to="/"
                            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Cancelar
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default TaskDelete;
