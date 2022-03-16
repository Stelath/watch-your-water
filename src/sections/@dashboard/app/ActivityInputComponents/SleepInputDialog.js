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
  color: theme.palette.primary.darker
}));

const RootStyle = styled(Container)(({ theme }) => ({
  width: 320,
  height: 392,
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.secondary.darker,
  backgroundColor: theme.palette.secondary.lighter
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
  color: theme.palette.secondary.main,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.secondary.dark, 0)} 0%, ${alpha(
    theme.palette.secondary.dark,
    0.24
  )} 100%)`
}));

export default function SleepInputDialog({ open, onSubmit, onClose }) {
  const [sleep, setSleep] = useState(0);

  const handleSliderChange = (event, value) => {
    setSleep(value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSubmit(Number(sleep));
    } else if (event.key === 'Backspace') {
      setSleep((value) => {
        if (value.toString().length === 1) {
          return 0;
        }
        return value.toString().slice(0, -1);
      });
    } else if (event.key === '.' && sleep.toString().indexOf('.') === -1) {
      setSleep((value) => `${value}.`);
    } else if (Number(event.key) || event.key === '0') {
      setSleep((value) => {
        if (value === 0) {
          return Number(event.key);
        }

        const newValue = parseFloat(value.toString() + event.key, 10);
        if (newValue.toString().length > 5) {
          return value;
        }
        if (newValue >= 24) {
          return 24;
        }
        return newValue;
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} onKeyDown={handleKeyPress}>
      <RootStyle>
        <IconWrapperStyle>
          <Iconify icon="mdi:power-sleep" width={156} height={156} />
        </IconWrapperStyle>
        <InputNumber variant="h3">{sleep}h</InputNumber>
        <Slider
          defaultValue={50}
          aria-label="Default"
          color="secondary"
          onChange={handleSliderChange}
          step={0.1}
          max={12}
          value={sleep}
          sx={{ width: 275 }}
        />
        <Button
          variant="contained"
          color="secondary"
          sx={{ borderRadius: '50%', width: 65, height: 65, marginTop: '10px' }}
          onClick={() => onSubmit(Number(sleep))}
        >
          <Iconify icon="mdi:check-bold" width={32} height={32} />
        </Button>
      </RootStyle>
    </Dialog>
  );
}

SleepInputDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};
