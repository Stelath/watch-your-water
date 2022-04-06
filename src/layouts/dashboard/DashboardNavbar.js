// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, Link, Container } from '@mui/material';
//
import AccountPopover from './AccountPopover';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 0;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
  }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

const LinkStyle = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: `underline`
  },
  marginLeft: '10px'
}));

// ----------------------------------------------------------------------

export default function DashboardNavbar() {
  return (
    <RootStyle>
      <ToolbarStyle>
        <Container sx={{ mt: '5px' }}>
          <LinkStyle href="/home">Home</LinkStyle>
          <LinkStyle href="/dashboard/leaderboard">Leaderboard</LinkStyle>
          <LinkStyle href="/dashboard/app">Dashboard</LinkStyle>
        </Container>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
