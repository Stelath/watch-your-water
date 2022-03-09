import { Alert, Snackbar, Slide } from '@mui/material';
import PropTypes from 'prop-types';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

function SnackbarAlert({ open, alert, onClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      TransitionComponent={SlideTransition}
    >
      <Alert severity="error" onClose={onClose}>
        {alert}
      </Alert>
    </Snackbar>
  );
}

SnackbarAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  alert: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default SnackbarAlert;
