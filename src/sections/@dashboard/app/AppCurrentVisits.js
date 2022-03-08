import { useTheme } from '@mui/material/styles';
import { Card, CardHeader, Box, Typography } from '@mui/material';

import Wave from 'react-wavify';
import WaterBottleImage from '../../../assets/images/WaterBottleImage';

const CHART_DATA = [4344, 5435, 1443, 4443];

export default function AppCurrentVisits() {
  const theme = useTheme();

  const waterLevelStyle = { mt: '75%', mb: 0, color: theme.palette.info.lighter };

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
                  marginBottom: 100,
                  marginLeft: 2,
                  width: 146,
                  zIndex: 0
                }}
                paused={false}
                options={{
                  height: 20,
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
              <Typography variant="h6" sx={{ mt: '235%', mb: 0, color: theme.palette.info.darker }}>
                - 10.5 -
              </Typography>
              <Typography variant="h6" sx={waterLevelStyle}>
                - 10.5 -
              </Typography>
              <Typography variant="h6" sx={waterLevelStyle}>
                - 10.5 -
              </Typography>
            </div>
          </div>
          <Typography variant="h4" sx={{ textAlign: 'center', mt: '30px' }}>
            100 OZ
          </Typography>
        </div>
      </Box>
    </Card>
  );
}
