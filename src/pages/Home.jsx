import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/services/useAuth';

const Home = () => {
  const { currentUser } = useAuth();  
  const navigate = useNavigate();

  const handleCreatePost = () => {
    if (currentUser) { 
      navigate('/create-post');
    } else {
        navigate('/signin');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-br from-pink-400 to-indigo-500">
      <h1 className="text-4xl font-bold text-white mb-4 animate-fade-in">
        {currentUser ? `Welcome back, ${currentUser.displayName || 'User'}!` : 'Welcome to Our Blog!'}
      </h1>

      <p className="text-lg text-white mb-6 animate-fade-in delay-150">
        {currentUser ? "Let's create something amazing today!" : 'Sign up to share your thoughts!'}
      </p>

      <button
        onClick={handleCreatePost}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 animate-fade-in delay-300"
      >
        {currentUser ? 'Start a New Post' : 'Sign Up to Create a Post'}
      </button>
    </div>
  );
};

export default Home;
