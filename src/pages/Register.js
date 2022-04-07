// React
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// firebase
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { RegisterForm } from '../sections/authentication/register';
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

export default function Register() {
  const [openAlert, setOpenAlert] = useState(false);
  const [alert, setAlert] = useState('');

  const navigate = useNavigate();

  const registerWithEmail = (email, password, firstName, lastName) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
          photoURL: '/static/mock-images/avatars/avatar_default.jpg'
        });
        navigate('/dashboard', { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setAlert(errorMessage);
        console.log(error);
        setOpenAlert(true);
      });
  };

  const registerWithService = (provider) => {
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
    <RootStyle title="Register | Watch Your Water">
      <AuthLayout>
        Already have an account? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/login">
          Login
        </Link>
      </AuthLayout>

      <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
          Track your water intake with Watch Your Water
        </Typography>
        <img alt="register" src="/static/illustrations/illustration_register.png" />
      </SectionStyle>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Get started absolutely free.
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Free forever. No credit card needed.
            </Typography>
          </Box>

          <AuthSocial loginHandler={registerWithService} />

          <RegisterForm registerHandler={registerWithEmail} />

          <SnackbarAlert open={openAlert} alert={alert} onClose={handleClose} />

          <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
            By registering, I agree to Watch Your Water&nbsp;
            <Link underline="always" color="textPrimary">
              Terms of Service
            </Link>
            &nbsp;and&nbsp;
            <Link underline="always" color="textPrimary">
              Privacy Policy
            </Link>
            .
          </Typography>

          <Typography
            variant="subtitle2"
            sx={{
              mt: 3,
              textAlign: 'center',
              display: { sm: 'none' }
            }}
          >
            Already have an account?&nbsp;
            <Link underline="hover" to="/login" component={RouterLink}>
              Login
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
