import * as React from 'react';
import PropTypes from 'prop-types';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';

import logo from '../assets/images/logo.svg';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: '100%',
  bgcolor: 'background.paper',
  p: 4,
  outline: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export default function LoadingScreen({ open }) {
  const [animationEnded, setAnimationEnded] = React.useState(false);
  const [animationNum, setAnimationNum] = React.useState(0);

  const handleAnimationEnd = () => {
    if (animationNum >= 1) setAnimationEnded(true);
    setAnimationNum((value) => value + 1);
  };

  return !animationEnded ? (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open} timeout={{ enter: 0, exit: 750 }} addEndListener={handleAnimationEnd}>
        <Box sx={style}>
          <div style={{ textAlign: 'center' }}>
            <img
              alt="Watch Your Water Logo"
              src={logo}
              style={{ height: 175, borderRadius: 10, marginBottom: 50 }}
            />
            <CircularProgress color="secondary" />
          </div>
        </Box>
      </Fade>
    </Modal>
  ) : null;
}

LoadingScreen.propTypes = {
  open: PropTypes.bool.isRequired
};
