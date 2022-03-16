import { useState } from 'react';
import PropTypes from 'prop-types';
import { styled, alpha } from '@mui/material/styles';
import { Container, Button, Dialog, Slider, Typography } from '@mui/material';
import Iconify from '../../../../components/Iconify';

const InputNumber = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -150%)',
  textAlign: 'center',
  color: theme.palette.warning.darker
}));

const RootStyle = styled(Container)(({ theme }) => ({
  width: 320,
  height: 392,
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.warning.darker,
  backgroundColor: theme.palette.warning.lighter
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
  color: theme.palette.warning.main,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.warning.dark, 0)} 0%, ${alpha(
    theme.palette.warning.dark,
    0.24
  )} 100%)`
}));

export default function CalorieInputDialog({ open, onSubmit, onClose }) {
  const [calories, setCalories] = useState(0);

  const handleSliderChange = (event, value) => {
    setCalories(value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSubmit(calories);
    } else if (event.key === 'Backspace') {
      setCalories((value) => {
        if (value.toString().length === 1) {
          return 0;
        }
        return value.toString().slice(0, -1);
      });
    } else if (Number(event.key) || event.key === '0') {
      setCalories((value) => {
        if (value === 0) {
          return Number(event.key);
        }

        const newValue = parseInt(value.toString() + event.key, 10);
        if (newValue >= 10000) {
          return 10000;
        }
        return newValue;
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} onKeyDown={handleKeyPress}>
      <RootStyle>
        <IconWrapperStyle>
          <Iconify icon="mdi:fire" width={256} height={256} />
        </IconWrapperStyle>
        <InputNumber variant="h3">{calories}</InputNumber>
        <Slider
          defaultValue={50}
          aria-label="Default"
          color="warning"
          onChange={handleSliderChange}
          max={2500}
          value={calories}
          sx={{ width: 275 }}
        />
        <Button
          variant="contained"
          color="warning"
          sx={{ borderRadius: '50%', width: 65, height: 65, marginTop: '10px' }}
          onClick={() => onSubmit(calories)}
        >
          <Iconify icon="mdi:check-bold" width={32} height={32} />
        </Button>
      </RootStyle>
    </Dialog>
  );
}

CalorieInputDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};
