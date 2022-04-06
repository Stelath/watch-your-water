import { useRef, useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
// material
import { alpha } from '@mui/material/styles';
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import MenuPopover from '../../components/MenuPopover';

import { getUserData } from '../../utils/getUserData';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Dashboard',
    icon: 'eva:home-fill',
    linkTo: '/'
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
    linkTo: '/settings'
  }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [account, setAccount] = useState({
    displayName: 'Loading...',
    email: 'Loading...',
    photoURL: '/static/mock-images/avatars/avatar_default.jpg'
  });

  const navigate = useNavigate();

  const firebaseLogout = () => {
    getAuth()
      .signOut()
      .then(
        () => {
          navigate('/', { replace: true });
        },
        () => {
          navigate('/404', { replace: true });
        }
      );
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getUserData(setAccount);
  }, []);

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Iconify
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined" onClick={firebaseLogout}>
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
