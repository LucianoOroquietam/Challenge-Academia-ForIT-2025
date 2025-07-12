import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Task } from '../../interface/Task';
import Search from '../../components/Search';

const Url = import.meta.env.VITE_API_URL;

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await fetch(`${Url}/tasks`);
                const data = await res.json();
                setTasks(data);
            } catch (err) {
                console.error('Error al obtener las tareas', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    if (loading) return <p className="text-center mt-10 text-gray-500">Cargando tareas...</p>;

    if (tasks.length === 0) return <p className="text-center mt-10 text-gray-400">No hay tareas todavía</p>;

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-3xl mx-auto mt-10 px-4">
            <h1 className="text-3xl text-gray-900 font-bold mb-6 text-center">Lista de Tareas</h1>

            <Search searchTask={setSearch} />

            {/* tareas filtradas */}
            <ul className="space-y-4 mb-5">
                {filteredTasks.length === 0 ? (
                    <p className="text-center text-gray-500">No se encontraron tareas</p>
                ) : (
                    filteredTasks.map(task => (
                        <li key={task.id} className="p-4 border rounded-lg shadow bg-white">
                            <h2 className="text-xl font-semibold">{task.title}</h2>
                            <p className="text-gray-600">{task.description}</p>
                            <p className={`text-sm mt-2 ${task.completed ? 'text-green-600' : 'text-red-600'}`}>
                                {task.completed ? 'Completada' : 'Pendiente'}
                            </p>
                            <p>{task.createdAt ? new Date(task.createdAt).toLocaleDateString() : 'Sin fecha'}</p>
                            <Link
                                to={`/TaskItem/${task.id}`}
                                className="bg-gray-900 text-white rounded-sm p-2 mt-2 inline-block text-center"
                            >
                                Ver detalle
                            </Link>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default TaskList;
