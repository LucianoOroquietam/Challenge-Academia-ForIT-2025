import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';
import NotFoundPage from '../pages/NotFoundPage';
import TaskItem from '../components/tasks/TaskItem';
import TaskDelete from '../components/tasks/TaskDelete';

export const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <TaskList />,
            },
            {
                path: 'TaskForm/:id?',
                element: <TaskForm />,
            },
            {
                path: 'TaskItem/:id',
                element: <TaskItem />
            },
            {
                path: 'TaskDelete/:id',
                element: <TaskDelete />
            },
            {
                path: '*',
                element: <NotFoundPage />,
            }
        ],
    },
]);
