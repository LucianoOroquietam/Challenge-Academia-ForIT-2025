import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { FormEvent } from 'react';
import type { Task } from '../../interface/Task';

const API_URL = import.meta.env.VITE_API_URL;

const TaskForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [successMessage, setSuccessMessage] = useState('');

  const [task, setTask] = useState<Task>({
    title: '',
    description: '',
    completed: false,
  });

  // si existe el id cargamos los datos para editar 
  useEffect(() => {
    if (id) {
      const fetchTaskEdit = async () => {
        try {
          const res = await fetch(`${API_URL}/tasks/${id}`);
          const data = await res.json();
          setTask({
            title: data.title,
            description: data.description ?? '',
            completed: data.completed,
          });
        } catch (error) {
          console.error("el id no es valido o no existe " + error);
        }
      }
      fetchTaskEdit();
    }
  }, [id]);

  //el objetivo aca es actualizar el estado cuando el usuario escribe en el input o checkea
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const name = target.name;
    const type = target.type;

    let value: string | boolean;

    if (type === 'checkbox') {
      // inferimos tipos con ts con el as
      value = (target as HTMLInputElement).checked;
    } else {
      value = target.value;
    }

    console.log("Campo cambiado:", name);
    console.log("Nuevo valor:", value);
    console.log("Tipo de input:", type);


    // creamos una copia del estado actual
    const newTask = {
      ...task,
      [name]: value,
    };

    console.log("Nuevo estado de task:", newTask);

    setTask(newTask as Task);
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const method = id ? 'PUT' : 'POST';
      const url = id ? `${API_URL}/tasks/${id}` : `${API_URL}/tasks`;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (res.ok) {
        setSuccessMessage('La tarea se edito con exito');

        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        console.error('Error al guardar tarea');
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }


  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10 space-y-4">
      {successMessage && (
        <p className="text-green-500 font-semibold mb-4 text-center bg-gray-900 p-2">{successMessage}</p>
      )}
      <h2 className="text-2xl font-bold text-center">
        {id ? 'Editar tarea' : 'Nueva tarea'}
      </h2>

      <div>
        <label className="block mb-1 font-semibold">Titulo</label>
        <input
          name="title"
          value={task.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Descripcion</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="completed"
          checked={task.completed}
          onChange={handleChange}
        />
        <label className="font-semibold">¿Completada?</label>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {id ? 'Guardar cambios' : 'Crear tarea'}
      </button>
    </form>
  );
};

export default TaskForm;
