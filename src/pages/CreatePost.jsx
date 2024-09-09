import { useState, useEffect } from 'react';
import { createPost } from '../contexts/services/PostService';
import { auth } from '../contexts/services/FirebaseService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreatePost() {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!title || !content) {
      toast.error('All required fields must be filled.');
      setLoading(false);
      return;
    }

    if (title.trim().length < 5) {
      toast.success('Title must be at least 5 characters long.');
      return;
    }
    if (content.trim().length < 20) {
      toast.error('Content must be at least 20 characters long.');
      return;
    }
    

    try {
      await createPost({
        title,
        content,
        commentsCount: 0,
        likes: 0,
        author: {
          uid: user.uid,
          displayName: user.displayName || user.email,
        },
        createdAt: new Date().toISOString(),
      });
      toast.success('Post created successfully!');
      setTitle('');
      setContent('');
    } catch (err) {
      toast.error('Failed to create post: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">Post Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter post title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="content">Post Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter post content"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
