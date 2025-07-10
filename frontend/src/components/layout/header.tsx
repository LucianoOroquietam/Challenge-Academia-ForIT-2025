import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className='flex items-center h-12 bg-gray-900 px-4'>
            <ul className='flex gap-4'>
                <li><Link className='text-white' to="/">Inicio</Link></li>
                <li><Link className='text-white' to="/TaskForm">TaskForm</Link></li>
            </ul>
        </header>
    );
};

export default Header
