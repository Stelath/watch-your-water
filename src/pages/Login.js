// React
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography } from '@mui/material';
// firebase
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { LoginForm } from '../sections/authentication/login';
import AuthSocial from '../sections/authentication/AuthSocial';
import SnackbarAlert from '../components/SnackbarAlert';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
  const [openAlert, setOpenAlert] = useState(false);
  const [alert, setAlert] = useState('');

  const navigate = useNavigate();

  const loginWithEmail = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/dashboard', { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.code;
        setAlert(errorMessage);
        setOpenAlert(true);
      });
  };

  const loginWithService = (provider) => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(() => {
        navigate('/dashboard', { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.code;
        setAlert(errorMessage);
        setOpenAlert(true);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <RootStyle title="Login | Watch Your Water">
      <AuthLayout>
        Don’t have an account? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/register">
          Get started
        </Link>
      </AuthLayout>

      <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
          Hi, Welcome Back
        </Typography>
        <img src="/static/illustrations/illustration_login.png" alt="login" />
      </SectionStyle>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Sign in to Watch Your Water
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
          </Stack>
          <AuthSocial loginHandler={loginWithService} />

          <LoginForm loginHandler={loginWithEmail} />

          <SnackbarAlert open={openAlert} alert={alert} onClose={handleClose} />

          <Typography
            variant="body2"
            align="center"
            sx={{
              mt: 3,
              display: { sm: 'none' }
            }}
          >
            Don’t have an account?&nbsp;
            <Link variant="subtitles2" component={RouterLink} to="register" underline="hover">
              Get started
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
