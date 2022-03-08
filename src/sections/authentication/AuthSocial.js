// material
import { Stack, Button, Divider, Typography } from '@mui/material';
// component
import {
  getAuth,
  signInWithPopup,
  OAuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider
} from 'firebase/auth';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const loginWithService = (provider) => {
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const { user } = result;
      console.log(user);
      // Apple credential
      const credential = OAuthProvider.credentialFromResult(result);
      // const accessToken = credential.accessToken;
      // const idToken = credential.idToken;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The credential that was used.
      const credential = OAuthProvider.credentialFromError(error);
    });
};

export default function AuthSocial() {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          onClick={() => loginWithService(new GoogleAuthProvider())}
        >
          <Iconify icon="eva:google-fill" color="#DF3E30" height={24} />
        </Button>

        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          onClick={() => loginWithService(new FacebookAuthProvider())}
        >
          <Iconify icon="eva:facebook-fill" color="#1877F2" height={24} />
        </Button>

        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          onClick={() => loginWithService(new OAuthProvider('apple.com'))}
        >
          <Iconify icon="bi:apple" color="#AAAAAA" height={24} />
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
