import PropTypes from 'prop-types';
// material
import { Stack, Button, Divider, Typography } from '@mui/material';
// component
import { OAuthProvider, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

export default function AuthSocial({ loginHandler }) {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          onClick={() => loginHandler(new GoogleAuthProvider())}
        >
          <Iconify icon="eva:google-fill" color="#DF3E30" height={24} />
        </Button>

        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          onClick={() => loginHandler(new FacebookAuthProvider())}
        >
          <Iconify icon="eva:facebook-fill" color="#1877F2" height={24} />
        </Button>

        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          onClick={() => loginHandler(new OAuthProvider('apple.com'))}
        >
          <Iconify icon="ant-design:apple-filled" color="#AAAAAA" height={24} />
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

AuthSocial.propTypes = {
  loginHandler: PropTypes.func
};
