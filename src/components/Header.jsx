import { useTheme } from '../contexts/useTheme';
import { FaSun, FaMoon } from 'react-icons/fa'; 

const Header = () => {
    const { theme, toggleTheme } = useTheme();

    if (!theme || !toggleTheme) {
        return null; 
    }

    return (
        <header className={`p-4 shadow-md ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'} transition-colors duration-300`}>
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">
                    My Blog
                </div>
                <nav>
                    <ul className="flex space-x-5">
                        <li>
                            <a href="#" className="hover:text-gray-300">Home</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-gray-300">About</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-gray-300">Contact</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-gray-300">Posts</a>
                        </li>
                    </ul>
                </nav>
                <button 
                    onClick={toggleTheme}
                    aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                    className={`p-2 rounded-full focus:outline-none transition-colors duration-300 ${theme === 'light' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                >
                    {theme === 'light' ? <FaMoon size={18} /> : <FaSun size={18} />}
                </button>
            </div>
        </header>
    );
};

export default Header;
