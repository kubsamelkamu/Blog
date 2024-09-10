import { useState } from 'react';
import { auth, storage } from '../../contexts/services/FirebaseService';
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useTheme } from '../../contexts/useTheme';

function ProfileManagement() {
  const {theme} = useTheme();
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState(user.displayName || '');
  const [email, setEmail] = useState(user.email || '');
  const [profilePic, setProfilePic] = useState(user.photoURL || '');
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploading, setUploading] = useState(false);
  const [previewPic, setPreviewPic] = useState(profilePic);

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleProfileUpdate = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await updateProfile(user, { displayName, photoURL: profilePic });
      setSuccess('Profile updated successfully!');
      setEditing(false);
    } catch (err) {
        setError(err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `profile_pics/${user.uid}/${file.name}`);
    setUploading(true);

    try {
      const url = URL.createObjectURL(file);
      setPreviewPic(url);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setProfilePic(downloadURL);
      setSuccess('Profile picture updated successfully!');
    } catch (err) {
        setError(err);
      setError('Failed to upload profile picture. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`w-full min-h-screen p-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div className={`max-w-4xl mx-auto p-6 rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <h2 className="text-2xl font-bold mb-6 text-center">Profile Management</h2>

        {success && <p className="text-green-500 mb-4">{success}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="flex flex-col items-center mb-4">
          <img
            src={previewPic || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4 object-cover"
          />
          {editing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              aria-label="Upload profile picture"
            />
          )}
          {uploading && <p className="text-blue-500">Uploading...</p>}
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="displayName" className="text-sm font-bold mb-1">Display Name</label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            disabled={!editing}
            className={`px-3 py-1 rounded-md text-sm ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-300'}`}
            aria-label="Display Name"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="text-sm font-bold mb-1">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!editing}
            className={`px-3 py-1 rounded-md text-sm ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-300'}`}
            aria-label="Email"
          />
        </div>

        <div className="flex justify-between">
          {editing ? (
            <>
              <button
                onClick={handleProfileUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={loading || uploading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={handleEditToggle}
                className={`px-3 py-1 rounded-md text-sm ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-300'}`}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleEditToggle}
              className={`px-3 py-1 rounded-md text-sm ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-300'}`}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileManagement;
