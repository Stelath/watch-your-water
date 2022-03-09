import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export async function getUserData(callbackFunc) {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      callbackFunc(user);
    } else {
      useNavigate('/login', { replace: true });
    }
  });
}
