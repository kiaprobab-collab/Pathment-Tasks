import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserSuccess, deleteUserSuccess, signOutSuccess } from '../redux/user/userSlice';
import { updateUserAPI, deleteUserAPI } from '../../api/userAPI';
import { authLogout } from '../../api/authAPI';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fileRef = useRef(null);

  const [formData, setFormData] = useState({
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    password: '',
  });
  const [image, setImage] = useState(null);
  const [imagePercent, setImagePercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (file) => {
    try {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImagePercent(Math.round(progress));
        },
        (error) => {
          setFileUploadError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            setFormData((prev) => ({ ...prev, avatar: downloadURL }));
            try {
              const data = await updateUserAPI(currentUser._id, { avatar: downloadURL });
              dispatch(updateUserSuccess(data.user));
            } catch (err) {
              setError('Image uploaded but failed to save. Click Update to retry.');
            }
          });
        }
      );
    } catch (err) {
      setFileUploadError(true);
    }
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setUpdateSuccess(false);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUpdateSuccess(false);

    try {
      // Only send fields that have values (skip empty password)
      const payload = { username: formData.username, email: formData.email };
      if (formData.password) payload.password = formData.password;
      if (formData.avatar) payload.avatar = formData.avatar;

      const data = await updateUserAPI(currentUser._id, payload);
      dispatch(updateUserSuccess(data.user));
      setUpdateSuccess(true);
      setFormData((prev) => ({ ...prev, password: '' }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This cannot be undone.')) return;

    try {
      await deleteUserAPI(currentUser._id);
      dispatch(deleteUserSuccess());
      navigate('/sign-in');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete account');
    }
  };

  const handleSignOut = async () => {
    try {
      await authLogout();
      dispatch(signOutSuccess());
      navigate('/sign-in');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to sign out');
    }
  };

  return (
    <div className='min-h-[calc(100vh-72px)] flex items-start justify-center pt-12 bg-gray-50'>
      <div className='w-full max-w-md p-8 bg-white rounded-xl shadow-sm'>

        {/* Title */}
        <h1 className='text-center text-2xl font-bold text-slate-800 mb-7'>
          Profile
        </h1>

        {/* Avatar */}
        <div className='flex flex-col items-center mb-6'>
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currentUser?.avatar || 'https://ui-avatars.com/api/?name=' + (currentUser?.username || 'U') + '&background=f59e0b&color=fff&bold=true'}
            alt="avatar"
            className='w-20 h-20 rounded-full object-cover border-3 border-amber-400 cursor-pointer hover:opacity-90 transition-opacity'
          />
          {/* Upload status text */}
          <p className='text-center text-xs mt-2 mb-4'>
            {fileUploadError ? (
              <span className='text-red-600'>Error uploading image (must be less than 2MB)</span>
            ) : imagePercent > 0 && imagePercent < 100 ? (
              <span className='text-indigo-500'>{`Uploading ${imagePercent}%...`}</span>
            ) : imagePercent === 100 ? (
              <span className='text-green-600'>Image uploaded successfully!</span>
            ) : null}
          </p>
        </div>

        {/* Status Messages */}
        {error && (
          <div className='bg-red-50 text-red-600 px-4 py-2.5 rounded-lg text-sm mb-4 text-center border border-red-200'>
            {error}
          </div>
        )}
        {updateSuccess && (
          <div className='bg-green-50 text-green-600 px-4 py-2.5 rounded-lg text-sm mb-4 text-center border border-green-200'>
            Profile updated successfully!
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder='Username'
            className='w-full px-4 py-3 border border-slate-200 rounded-lg text-sm text-slate-800 bg-slate-50 outline-none focus:border-slate-400 transition-colors'
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder='Email'
            className='w-full px-4 py-3 border border-slate-200 rounded-lg text-sm text-slate-800 bg-slate-50 outline-none focus:border-slate-400 transition-colors'
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder='Password'
            className='w-full px-4 py-3 border border-slate-200 rounded-lg text-sm text-slate-800 bg-slate-50 outline-none focus:border-slate-400 transition-colors'
          />

          <button
            type="submit"
            disabled={loading}
            className='w-full py-3 bg-slate-700 text-white rounded-lg text-sm font-semibold uppercase hover:bg-slate-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all'
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </form>

        {/* Bottom Actions */}
        <div className='flex justify-between mt-5 pt-4 border-t border-slate-100'>
          <button
            onClick={handleDeleteUser}
            className='text-red-600 text-sm font-semibold cursor-pointer hover:text-red-700 transition-colors'
          >
            Delete Account
          </button>
          <button
            onClick={handleSignOut}
            className='text-red-600 text-sm font-semibold cursor-pointer hover:text-red-700 transition-colors'
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}