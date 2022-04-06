// react
import { useState, useEffect } from 'react';
// material
import { Box, Grid, Container, Typography } from '@mui/material';
// firebase
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore/lite';
import firebaseApp from '../Firebase';
import { getUserData } from '../utils/getUserData';
// utils
import { dateToISOFormat } from '../utils/formatDate';
// components
import Page from '../components/Page';
import LoadingScreen from '../components/LoadingScreen';

import {
  ActivityGraph,
  DailyCaloriesBurned,
  DailySteps,
  DailyWaterDrunk,
  WaterBottleGraph,
  DailySleep,
  ActivityInput
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState(null);

  const [dayActivity, setDayActivity] = useState([0, 0, 0, 0]);
  const [waterGoal, setWaterGoal] = useState(100);
  const [chartData, setChartData] = useState([
    {
      name: 'Steps',
      type: 'column',
      data: Array(30).fill(0)
    },
    {
      name: 'Calories Burned',
      type: 'area',
      data: Array(30).fill(0)
    },
    {
      name: 'Water Drunk',
      type: 'line',
      data: Array(30).fill(0)
    }
  ]);

  const db = getFirestore(firebaseApp);
  const getUserActivity = async (uid) => {
    const docRef = doc(db, 'userData', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  };

  const createNewUserActivity = async (uid) => {
    const date = new Date();

    const data = {
      activity: {},
      joinDate: date.toLocaleDateString('en'),
      waterGoal: 120
    };
    data.activity[dateToISOFormat(date)] = [0, 0, 0, 0];

    await setDoc(doc(db, 'userData', uid), data);
  };

  useEffect(() => {
    getUserData(async (user) => {
      const { uid } = user;
      setUid(uid);
      let userData = await getUserActivity(uid);

      if (!userData) {
        userData = await createNewUserActivity(uid);
      }

      const { activity, waterGoal } = userData;

      setWaterGoal(waterGoal);

      const newChartData = [];

      for (let i = 0; i < 30; i += 1) {
        const date = new Date(new Date().setDate(new Date().getDate() - i));
        const formattedDate = dateToISOFormat(date);
        newChartData[i] = activity[formattedDate] || [0, 0, 0, 0];

        if (i === 0) setDayActivity(newChartData[i]);
      }

      setChartData(() => [
        {
          name: 'Steps',
          type: 'column',
          data: newChartData.map((item) => item[0] * (3 / 1000))
        },
        {
          name: 'Calories Burned',
          type: 'area',
          data: newChartData.map((item) => item[1] / 10)
        },
        {
          name: 'Water Drunk',
          type: 'line',
          data: newChartData.map((item) => item[2])
        }
      ]);

      setLoading(false);
    });
  }, []);

  const handleActivityInput = async (inputData, activityIndex) => {
    const docRef = doc(db, 'userData', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { activity } = docSnap.data();
      const date = new Date();

      const updatedActivity = {};
      if (activity[dateToISOFormat(date)]) {
        updatedActivity[`activity.${dateToISOFormat(date)}`] = [...activity[dateToISOFormat(date)]];
      } else {
        updatedActivity[`activity.${dateToISOFormat(date)}`] = [0, 0, 0, 0];
      }

      updatedActivity[`activity.${dateToISOFormat(date)}`][activityIndex] += inputData;
      // eslint-disable-next-line prefer-destructuring
      updatedActivity.waterDrunkToday = updatedActivity[`activity.${dateToISOFormat(date)}`][2];

      await updateDoc(docRef, updatedActivity);
      if (activityIndex < 3) {
        setChartData((value) => {
          const newChartData = [...value];
          newChartData[activityIndex].data[0] =
            updatedActivity[`activity.${dateToISOFormat(date)}`][activityIndex] *
            [3 / 1000, 1 / 10, 1][activityIndex];
          return newChartData;
        });
      }
      setDayActivity(updatedActivity[`activity.${dateToISOFormat(date)}`]);
    }
  };

  const handleWaterGoalInput = async ({ weight, exercise }) => {
    const docRef = doc(db, 'userData', uid);
    const newWaterGoal = Math.round((2 / 3) * weight + (exercise / 30) * 12);
    await updateDoc(docRef, { waterGoal: newWaterGoal });
    setWaterGoal(newWaterGoal);
  };

  return (
    <Page title="Dashboard | Watch Your Water">
      <LoadingScreen open={loading} />
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={8}>
            <ActivityGraph chartData={chartData} />
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <WaterBottleGraph waterDrunk={dayActivity[2]} waterGoal={waterGoal} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <DailySteps steps={dayActivity[0]} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DailyWaterDrunk water={dayActivity[2]} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DailyCaloriesBurned calories={dayActivity[1]} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DailySleep sleep={dayActivity[3]} />
          </Grid>
        </Grid>
        <Box sx={{ pt: 5 }}>
          <Typography variant="h4">Stay Healthy!</Typography>
        </Box>
      </Container>

      <ActivityInput
        handleWaterInput={(water) => handleActivityInput(water, 2)}
        handleWaterGoalInput={(weight, exercise) => handleWaterGoalInput(weight, exercise)}
        handleStepInput={(steps) => handleActivityInput(steps, 0)}
        handleCalorieInput={(calories) => handleActivityInput(calories, 1)}
        handleSleepInput={(sleep) => handleActivityInput(sleep, 3)}
      />
    </Page>
  );
}
