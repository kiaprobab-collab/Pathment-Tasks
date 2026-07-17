import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { authGoogle } from '../../api/authAPI';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const data = await authGoogle({
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });

      dispatch(signInSuccess(data.user));
      navigate('/');
    } catch (error) {
      console.log('could not sign in with google', error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      //When we click this button it is not going to submit the form !
      type='button'
      className='bg-red-700 text-white p-3 rounded-sm uppercase hover:opacity-90'
    >
      Continue with google
    </button>
  );
}