import { useTheme } from '../contexts/useTheme';
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa'; 

function Footer(){
    const { theme } = useTheme(); 

    return (
        <footer className={`p-6 ${theme === 'light' ? 'bg-gray-100 text-black' : 'bg-gray-800 text-white'} transition-colors duration-300`}>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <div>
                    <h3 className="font-bold text-lg mb-2">Contact Us</h3>
                    <p>Email: kubsamlkm@gmail.com</p>
                    <p>Phone: +251905283691</p>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-2">Quick Links</h3>
                    <ul>
                        <li><a href="#" className="hover:text-gray-500">Home</a></li>
                        <li><a href="#" className="hover:text-gray-500">About</a></li>
                        <li><a href="#" className="hover:text-gray-500">Contact</a></li>
                        <li><a href="#" className="hover:text-gray-500">Posts</a></li>
                        <li><a href="#" className="hover:text-gray-500">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-gray-500">Terms of Service</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-2">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a href="https://twitter.com" aria-label="Twitter" className="hover:text-gray-500"><FaInstagram size={24} /></a>
                        <a href="https://github.com" aria-label="GitHub" className="hover:text-gray-500"><FaGithub size={24} /></a>
                        <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-gray-500"><FaLinkedin size={24} /></a>
                    </div>
                </div>
            </div>

            <div className="mt-6 text-center border-t pt-4">
                <p>© {new Date().getFullYear()} My Blog - All Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;
