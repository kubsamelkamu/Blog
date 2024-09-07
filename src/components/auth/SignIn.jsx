import { useState } from 'react';
import { auth } from '../../contexts/services/FirebaseService';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[emailLogin,setEmailLogin] = useState(false);
  const[googleLogin,setGoogleLogin] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setEmailLogin(true);
    setError(null);

    if (!email || !password) {
      setError('Email and Password are required.');
      setEmailLogin(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        setError('Please verify your email address before signing in.');
        await auth.signOut();
      } else {
        navigate('/blog');
      }
    } catch (err) {
      const errorCode = err.code;
      switch (errorCode) {
        case 'auth/user-not-found':
          setError('User not found.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email format.');
          break;
        default:
          setError('Login failed. Please try again.');
          break;
      }
    } finally {
      setEmailLogin(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLogin(true);
    setError(null);

    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/home');
    } catch (err) {
      setError(err);
      setError('Google sign-in failed. Please try again.');
    } finally {
      setGoogleLogin(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md border-2 border-blue-500 ">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form onSubmit={handleSignIn}>
          <div className="flex flex-col mb-4">
            <label className="text-sm font-bold mb-1">Email</label>
            <input
              type="email"
              className="border p-2 rounded w-full"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-sm font-bold mb-1">Password</label>
            <input
              type="password"
              className="border p-2 rounded w-full"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            disabled={emailLogin}
          >
            {emailLogin ? 'Signing In...' : 'Sign In'}
          </button>
          {error && <p className="mt-4 text-red-600">{error}</p>}
        </form>

        <button
          onClick={handleGoogleSignIn}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full mt-4"
          disabled={googleLogin}
        >
          {googleLogin ? 'Signing In with Google...' : 'Sign In with Google'}
        </button>
        <div className="mt-4 text-center">
          <p>Do not have an account? <a href="/signup" className="text-blue-500">sign up</a></p>
        </div>
      </div>
     
    </div>
  );
}

export default Login;