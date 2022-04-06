import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Container } from '@mui/material';

export default function AuthCheckRoute({ to, secondary }) {
  const navigate = useNavigate();
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigate(to, { replace: true });
    } else {
      navigate(secondary, { replace: true });
    }
  });

  return (
    <Container
      sx={{
        position: 'fixed',
        padding: 0,
        margin: 0,
        top: 0,
        left: 0,
        height: '100vh',
        backgroundColor: 'white',
        zIndex: 100
      }}
    />
  );
}
