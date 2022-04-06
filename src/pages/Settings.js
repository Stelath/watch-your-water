import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, updateProfile, updatePassword, deleteUser } from 'firebase/auth';

import { Button, Card, Grid, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

import Page from '../components/Page';
import { ProfilePictureForm, PasswordForm } from '../sections/settings';
import SnackbarAlert from '../components/SnackbarAlert';
import LoadingScreen from '../components/LoadingScreen';

import { getUserData } from '../utils/getUserData';

const CardStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5),
  width: '500px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

export default function Settings() {
  const [account, setAccount] = useState({
    displayName: 'Loading...',
    email: 'Loading...',
    photoURL: ''
  });
  const [openAlert, setOpenAlert] = useState(false);
  const [alert, setAlert] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getUserData(doneLoading);
  }, []);

  const doneLoading = (userData) => {
    setAccount(userData);
    setLoading(false);
  };

  const changeProfilePicture = (url) => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      photoURL: url
    })
      .then(() => {
        navigate('/settings');
      })
      .catch((error) => {
        setAlert(error.code);
        setOpenAlert(true);
      });
  };

  const changePassword = (oldPassword, newPassword) => {
    const auth = getAuth();
    const user = auth.currentUser;

    const credential = auth.EmailAuthProvider.credential(user.email, oldPassword);

    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        updatePassword(user, newPassword);
      })
      .catch((error) => {
        setAlert(error.code);
        setOpenAlert(true);
      });
  };

  const deleteAccount = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    deleteUser(user)
      .then(() => {
        navigate('/home');
      })
      .catch((error) => {
        setAlert(error.code);
        setOpenAlert(true);
      });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <Page title="Settings | Watch Your Water">
      <Container maxWidth="xl" sx={{ flexGrow: 1 }} style={{ marginTop: 100 }}>
        <Grid container spacing={3} direction="column" justifyContent="center" alignItems="center">
          <Grid item>
            <CardStyle>
              <img src={account.photoURL} style={{ height: 100, borderRadius: 50 }} alt="Profile" />
            </CardStyle>
          </Grid>
          <Grid item>
            <CardStyle>
              <ProfilePictureForm onSubmit={changeProfilePicture} />
            </CardStyle>
          </Grid>
          <Grid item>
            <CardStyle>
              <PasswordForm onSubmit={changePassword} />
            </CardStyle>
          </Grid>
          <Grid item>
            <CardStyle>
              <Button variant="outlined" color="error" onClick={deleteAccount}>
                Delete Account
              </Button>
            </CardStyle>
          </Grid>
        </Grid>
      </Container>
      <LoadingScreen open={loading} />
      <SnackbarAlert open={openAlert} alert={alert} onClose={handleSnackbarClose} />
    </Page>
  );
}
