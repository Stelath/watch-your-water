import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import Iconify from '../../../../components/Iconify';

const FixedSpeedDial = styled(SpeedDial)(() => ({
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed'
}));

export default function DashboardFab({
  onWaterClick,
  onSetGoalClick,
  onCalorieClick,
  onStepsClick,
  onSleepClick
}) {
  const theme = useTheme();
  const actions = [
    {
      icon: <Iconify icon="mdi:water" width={32} height={32} />,
      name: 'Log Water',
      sx: {
        backgroundColor: theme.palette.info.lighter,
        color: theme.palette.info.darker,
        width: 48,
        height: 48
      },
      onClick: onWaterClick
    },
    {
      icon: <Iconify icon="fluent:target-arrow-16-filled" width={32} height={32} />,
      name: 'Set Water Goal',
      sx: {
        backgroundColor: theme.palette.info.lighter,
        color: theme.palette.info.darker,
        width: 48,
        height: 48
      },
      onClick: onSetGoalClick
    },
    {
      icon: <Iconify icon="mdi:fire" width={32} height={32} />,
      name: 'Log Calories',
      sx: {
        backgroundColor: theme.palette.warning.lighter,
        color: theme.palette.warning.dark,
        width: 48,
        height: 48
      },
      onClick: onCalorieClick
    },
    {
      icon: <Iconify icon="mdi:run" width={32} height={32} />,
      name: 'Log Steps',
      sx: {
        backgroundColor: theme.palette.primary.lighter,
        color: theme.palette.primary.dark,
        width: 48,
        height: 48
      },
      onClick: onStepsClick
    },
    {
      icon: <Iconify icon="mdi:power-sleep" width={32} height={32} />,
      name: 'Log Sleep',
      sx: {
        backgroundColor: theme.palette.secondary.lighter,
        color: theme.palette.secondary.dark,
        width: 48,
        height: 48
      },
      onClick: onSleepClick
    }
  ];

  return (
    <FixedSpeedDial
      FabProps={{
        sx: {
          bgcolor: 'info.main',
          '&:hover': {
            bgcolor: 'secondary.main'
          }
        }
      }}
      ariaLabel="Log Activity"
      color="info"
      icon={<SpeedDialIcon openIcon={<Iconify icon="mdi:pencil" width={24} height={24} />} />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          sx={action.sx}
          onClick={action.onClick}
        />
      ))}
    </FixedSpeedDial>
  );
}
