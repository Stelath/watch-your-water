import { DashboardFab, WaterInputDialog } from './ActivityInputComponents';

export default function ActivityInput({ handleWaterInput, handleCalorieInput, handleStepInput }) {
  return (
    <div>
      <DashboardFab />
      <WaterInputDialog open />
    </div>
  );
}
