import { useState, useEffect } from 'react';
import { createPost } from '../contexts/services/PostService';
import { auth } from '../contexts/services/FirebaseService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import ReactMarkdown from 'react-markdown';
import { ClipLoader } from 'react-spinners'; 
import { useTheme } from '../contexts/useTheme';

function CreatePost() {
  const { theme } = useTheme(); 
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isMarkdown, setIsMarkdown] = useState(false); 
  const contentCharLimit = 2000;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const draftTitle = localStorage.getItem('draftTitle');
    const draftContent = localStorage.getItem('draftContent');
    if (draftTitle) setTitle(draftTitle);
    if (draftContent) setContent(draftContent);
  }, []);

  const handleSaveDraft = () => {
    localStorage.setItem('draftTitle', title);
    localStorage.setItem('draftContent', content);
    toast.info('Draft saved successfully!');
  };

  const handleContentChange = (value) => {
    setContent(value);
    const text = isMarkdown ? value : value.replace(/<\/?[^>]+(>|$)/g, '').trim();
    const words = text.split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    setCharCount(text.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!title || !content) {
      toast.error('All required fields must be filled.');
      setLoading(false);
      return;
    }

    if (title.trim().length < 5) {
      toast.error('Title must be at least 5 characters long.');
      setLoading(false);
      return;
    }
    if (content.trim().length < 20) {
      toast.error('Content must be at least 20 characters long.');
      setLoading(false);
      return;
    }
    if (charCount > contentCharLimit) {
      toast.error(`Content must be less than ${contentCharLimit} characters.`);
      setLoading(false);
      return;
    }

    try {
      await createPost({
        title,
        content,
        format: isMarkdown ? 'markdown' : 'html',
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
      localStorage.removeItem('draftTitle');
      localStorage.removeItem('draftContent');
    } catch (err) {
      toast.error('Failed to create post: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`w-full min-h-screen p-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div className={`max-w-4xl mx-auto p-6 rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
     
        <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 font-medium" htmlFor="title">Post Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-white'}`}
              placeholder="Enter post title"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium" htmlFor="content">Post Content</label>
            <div className="mb-2">
              <button
                type="button"
                onClick={() => setIsMarkdown(!isMarkdown)}
                className={`px-3 py-1 rounded-md text-sm ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-300'}`}
              >
                {isMarkdown ? 'Switch to Rich Text' : 'Switch to Markdown'}
              </button>
            </div>

            {isMarkdown ? (
              <textarea
                value={content}
                onChange={(e) => handleContentChange(e.target.value)}
                className={`w-full h-40 p-2 border rounded-lg ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                placeholder="Write your post content in Markdown..."
              />
            ) : (
              <ReactQuill
                theme="snow"
                value={content}
                onChange={handleContentChange}
                className={`bg-white ${theme === 'dark' && 'text-black'}`}
                placeholder="Write your post content here..."
              />
            )}

            <div className="flex justify-between text-gray-500 text-sm mt-2">
              <p>Word Count: {wordCount}</p>
              <p>{charCount}/{contentCharLimit} characters</p>
            </div>

            {isMarkdown && (
              <div className={`mt-4 p-4 border rounded-lg ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'}`}>
                <h3 className="text-lg font-semibold mb-2">Markdown Preview:</h3>
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleSaveDraft}
            className={`w-full py-2 rounded-lg mb-2 ${theme === 'dark' ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-500 hover:bg-gray-600'} text-white`}
          >
            Save Draft
          </button>
          
          <button
            type="submit"
            className={`w-full py-2 rounded-lg ${loading ? 'opacity-75 cursor-not-allowed' : ''} ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
            disabled={loading}
          >
            {loading ? (
              <ClipLoader size={20} color={"#fff"} />
            ) : 'Create Post'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
