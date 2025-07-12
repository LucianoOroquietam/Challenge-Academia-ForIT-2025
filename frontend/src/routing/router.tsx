import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import TaskList from '../pages/tasks/TaskList';
import TaskForm from '../pages/tasks/TaskForm';
import NotFoundPage from '../pages/NotFoundPage';
import TaskItem from '../pages/tasks/TaskItem';
import TaskDelete from '../pages/tasks/TaskDelete';

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
