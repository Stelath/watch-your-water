// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  ActivityGraph,
  DailyCaloriesBurned,
  DailySteps,
  DailyWaterDrunk,
  AppCurrentVisits,
  AppBugReports
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | Watch Your Water">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={14} md={8} lg={8}>
            <ActivityGraph />
          </Grid>

          <Grid item xs={10} md={4} lg={4}>
            <AppCurrentVisits />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <DailySteps />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DailyWaterDrunk />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DailyCaloriesBurned />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid>
        </Grid>
        <Box sx={{ pt: 5 }}>
          <Typography variant="h4">Stay Healthy!</Typography>
        </Box>
      </Container>
    </Page>
  );
}
