import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';
import NotFoundPage from '../pages/NotFoundPage';

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
                path: 'TaskForm',
                element: <TaskForm />,
            },
            {
                path: '*',
                element: <NotFoundPage />,
            }
        ],
    },
]);
