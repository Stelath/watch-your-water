import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import { Card, CardHeader, Box, Typography } from '@mui/material';

import Wave from 'react-wavify';
import WaterBottleImage from '../../../assets/images/WaterBottleImage';

export default function WaterBottleGraph({ waterDrunk, waterGoal }) {
  const theme = useTheme();
  const waterHeight = 235 - 235 * (waterDrunk / waterGoal);

  return (
    <Card>
      <CardHeader title="Water Drunk" subheader="Today" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <div style={{ height: 379 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div style={{ width: 150 }}>
              <Wave
                fill={theme.palette.info.main}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  marginBottom: 105,
                  marginLeft: 2,
                  width: 146,
                  zIndex: 0,
                  height: 235
                }}
                paused={false}
                options={{
                  height: waterHeight,
                  amplitude: 5,
                  speed: 0.2,
                  points: 3
                }}
              />
              <WaterBottleImage
                stroke={theme.palette.info.main}
                fill={theme.palette.info.main}
                sx={{ zIndex: 1, position: 'relative' }}
              />
            </div>

            <div style={{ padding: '5px', height: 379, position: 'absolute' }}>
              <Typography
                variant="h6"
                sx={{
                  mt: '125px',
                  mb: 0,
                  color: waterHeight <= 40 ? theme.palette.info.lighter : theme.palette.info.darker
                }}
              >
                - {Math.round(waterGoal * (3 / 4))} -
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mt: '42px',
                  mb: 0,
                  color: waterHeight <= 110 ? theme.palette.info.lighter : theme.palette.info.darker
                }}
              >
                - {Math.round(waterGoal * (2 / 4))} -
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mt: '42px',
                  mb: 0,
                  color: waterHeight <= 180 ? theme.palette.info.lighter : theme.palette.info.darker
                }}
              >
                - {Math.round(waterGoal * (1 / 4))} -
              </Typography>
            </div>
          </div>
          <Typography variant="h4" sx={{ textAlign: 'center', mt: '30px' }}>
            {waterDrunk} / {waterGoal} OZ
          </Typography>
        </div>
      </Box>
    </Card>
  );
}

WaterBottleGraph.propTypes = {
  waterDrunk: PropTypes.number.isRequired,
  waterGoal: PropTypes.number.isRequired
};
