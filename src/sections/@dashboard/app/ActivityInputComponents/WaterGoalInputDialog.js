import { useState } from 'react';
import PropTypes from 'prop-types';
import { styled, alpha } from '@mui/material/styles';
import { Container, Dialog, Typography, TextField } from '@mui/material';
import Iconify from '../../../../components/Iconify';

const InputNumber = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -150%)',
  textAlign: 'center',
  color: theme.palette.info.darker
}));

const RootStyle = styled(Container)(({ theme }) => ({
  width: 320,
  height: 392,
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(24),
  height: theme.spacing(24),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.info.main,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
    theme.palette.info.dark,
    0.24
  )} 100%)`
}));

export default function WaterInputDialog({ open, onSubmit, onClose }) {
  const [water, setWater] = useState(0);
  const quickSelectButtonStyle = { borderRadius: '50%', width: 65, height: 65, margin: '0 10px' };

  const handleSliderChange = (event, value) => {
    setWater(value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSubmit(water);
    } else if (event.key === 'Backspace') {
      setWater((value) => {
        if (value.toString().length === 1) {
          return 0;
        }
        return value.toString().slice(0, -1);
      });
    } else if (Number(event.key) || event.key === '0') {
      setWater((value) => {
        if (value === 0) {
          return Number(event.key);
        }

        const newValue = parseInt(value.toString() + event.key, 10);
        if (newValue >= 320) {
          return 320;
        }
        return newValue;
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} onKeyDown={handleKeyPress}>
      <RootStyle>
        <TextField label="Weight (lbs)" variant="outlined" type="number" color="info" />
        <TextField label="Exercise (min)" variant="outlined" type="number" color="info" />
      </RootStyle>
    </Dialog>
  );
}

WaterInputDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};
