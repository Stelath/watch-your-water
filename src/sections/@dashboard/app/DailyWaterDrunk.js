import PropTypes from 'prop-types';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
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
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
    theme.palette.info.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

export default function DailyWaterDrunk({ water }) {
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Iconify icon="mdi:water" width={32} height={32} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(water)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Ounces of Water Drunk
      </Typography>
    </RootStyle>
  );
}

DailyWaterDrunk.propTypes = {
  water: PropTypes.number.isRequired
};
