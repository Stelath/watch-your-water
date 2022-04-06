import { useState } from 'react';
import PropTypes from 'prop-types';
import { styled, alpha } from '@mui/material/styles';
import { Container, Dialog, Typography, TextField, Button } from '@mui/material';
import Iconify from '../../../../components/Iconify';

const RootStyle = styled(Container)(({ theme }) => ({
  width: 320,
  height: 285,
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
}));

export default function WaterInputDialog({ open, onSubmit, onClose }) {
  const [weight, setWeight] = useState(0);
  const [exercise, setExercise] = useState(0);

  return (
    <Dialog open={open} onClose={onClose}>
      <RootStyle>
        <TextField
          label="Weight (lbs)"
          variant="outlined"
          type="number"
          color="info"
          onChange={(change) => setWeight(change.target.value)}
        />
        <TextField
          label="Exercise (min)"
          variant="outlined"
          type="number"
          color="info"
          sx={{ mt: '15px' }}
          onChange={(change) => setExercise(change.target.value)}
        />
        <Button
          variant="contained"
          color="secondary"
          sx={{ borderRadius: '50%', width: 65, height: 65, marginTop: '15px' }}
          onClick={() => {
            if (weight !== 0 && exercise !== 0) onSubmit({ weight, exercise });
          }}
        >
          <Iconify icon="mdi:check-bold" width={32} height={32} />
        </Button>
      </RootStyle>
    </Dialog>
  );
}

WaterInputDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};
