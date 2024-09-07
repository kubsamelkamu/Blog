import { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link
import { useTheme } from '../contexts/useTheme';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

function Header() {
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={`p-4 shadow-md ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'} transition-colors duration-300`}>
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">
                    <Link to="/">Blog</Link> 
                    <button 
                        onClick={handleMenuToggle}
                        className="block lg:hidden p-2 rounded-full focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
                    </button>
                </div>

                <nav className={`lg:flex lg:space-x-3 ${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
                    <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-3">
                        <li>
                            <Link to="/" className="hover:text-gray-300">Home</Link>
                        </li>
                        <li>
                            <Link to="/blog" className="hover:text-gray-300">Blog</Link>
                        </li>
                        <li>
                            <Link to="/profile" className="hover:text-gray-300">Profile</Link>
                        </li>
                    </ul>
                </nav>

                <button 
                    onClick={toggleTheme}
                    aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                    className={`p-2 rounded-full focus:outline-none transition-colors duration-300 ${theme === 'light' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                >
                    {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
                </button>
            </div>
        </header>
    );
};

export default Header;
