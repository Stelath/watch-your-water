import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  DashboardFab,
  WaterInputDialog,
  WaterGoalInputDialog,
  CalorieInputDialog,
  StepsInputDialog,
  SleepInputDialog
} from './ActivityInputComponents';

export default function ActivityInput({
  handleWaterInput,
  handleWaterGoalInput,
  handleCalorieInput,
  handleStepInput,
  handleSleepInput
}) {
  const [waterOpen, setWaterOpen] = useState(false);
  const [waterGoalOpen, setWaterGoalOpen] = useState(false);
  const [calorieOpen, setCalorieOpen] = useState(false);
  const [stepsOpen, setStepsOpen] = useState(false);
  const [sleepOpen, setSleepOpen] = useState(false);

  // Handle Submits
  const handleWaterSubmit = (water) => {
    handleWaterInput(water);
    setWaterOpen(false);
  };

  const handleWaterGoalSubmit = (sleep) => {
    handleWaterGoalInput(sleep);
    setWaterGoalOpen(false);
  };

  const handleCalorieSubmit = (calorie) => {
    handleCalorieInput(calorie);
    setCalorieOpen(false);
  };

  const handleStepsSubmit = (steps) => {
    handleStepInput(steps);
    setStepsOpen(false);
  };

  const handleSleepSubmit = (sleep) => {
    handleSleepInput(sleep);
    setSleepOpen(false);
  };

  // Handle Closes
  const handleWaterClose = () => {
    setWaterOpen(false);
  };

  const handleWaterGoalClose = () => {
    setWaterGoalOpen(false);
  };

  const handleCalorieClose = () => {
    setCalorieOpen(false);
  };

  const handleStepsClose = () => {
    setStepsOpen(false);
  };

  const handleSleepClose = () => {
    setSleepOpen(false);
  };

  return (
    <div>
      <DashboardFab
        onWaterClick={() => setWaterOpen(true)}
        onSetGoalClick={() => setWaterGoalOpen(true)}
        onCalorieClick={() => setCalorieOpen(true)}
        onStepsClick={() => setStepsOpen(true)}
        onSleepClick={() => setSleepOpen(true)}
      />
      <WaterInputDialog open={waterOpen} onClose={handleWaterClose} onSubmit={handleWaterSubmit} />
      <WaterGoalInputDialog
        open={waterGoalOpen}
        onClose={handleWaterGoalClose}
        onSubmit={handleWaterGoalSubmit}
      />
      <CalorieInputDialog
        open={calorieOpen}
        onClose={handleCalorieClose}
        onSubmit={handleCalorieSubmit}
      />
      <StepsInputDialog open={stepsOpen} onClose={handleStepsClose} onSubmit={handleStepsSubmit} />
      <SleepInputDialog open={sleepOpen} onClose={handleSleepClose} onSubmit={handleSleepSubmit} />
    </div>
  );
}

ActivityInput.propTypes = {
  handleWaterInput: PropTypes.func.isRequired,
  handleWaterGoalInput: PropTypes.func.isRequired,
  handleCalorieInput: PropTypes.func.isRequired,
  handleStepInput: PropTypes.func.isRequired,
  handleSleepInput: PropTypes.func.isRequired
};
