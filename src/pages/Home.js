import { styled } from '@mui/material/styles';
import { Container, Typography, Box, Button } from '@mui/material';

import Page from '../components/Page';

import logo from '../assets/images/logo-home.svg';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 840,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

const generateClipPath = (offset, frequency, amplitude, height, width) => {
  const units = (frequency * width) / 100;
  let clipPath = 'polygon(100% 0%, 0% 0% ';
  for (let i = 0; i <= 100; i += 1) {
    let val = offset + amplitude * Math.cos(i / units);
    val = (Math.round(val * 100) / 100 / height) * 100;
    clipPath += `, ${i}% ${val}%`;
  }
  clipPath += ');';
  return clipPath;
};

const Background = styled('div')(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '90%',
  backgroundImage: 'linear-gradient(to bottom right, #9f96ff, #427ed4)',
  clipPath: generateClipPath(100, 1.2, 3.5, 125, 1000),
  zIndex: -1
}));

const BackgroundFar = styled('div')(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: '#9cc9f5',
  zIndex: -2
}));

const TitleText = styled(Typography)(() => ({
  color: 'white'
}));

const buttonSX = {
  position: 'absolute',
  top: 0,
  right: 0,
  mt: '40px',
  backgroundColor: 'white',
  color: 'black',
  '&:hover': {
    color: 'white',
    backgroundColor: 'gray'
  }
};

export default function Home() {
  return (
    <RootStyle title="Watch Your Water">
      <BackgroundFar />
      <Background />
      <Button sx={{ ...buttonSX, mr: '150px' }} variant="contained" href="/login">
        Login
      </Button>
      <Button sx={{ ...buttonSX, mr: '50px' }} variant="contained" href="/register">
        Register
      </Button>
      <ContentStyle>
        <Container>
          <TitleText variant="h3" sx={{ fontSize: '62px !important' }}>
            Watch Your
          </TitleText>
          <TitleText variant="h1" sx={{ fontSize: '121px !important' }}>
            Water
          </TitleText>
        </Container>
        <Box
          component="img"
          src={logo}
          sx={{ height: 200, width: 200, borderRadius: 0.5 }}
          alt="LOGO"
        />
      </ContentStyle>
    </RootStyle>
  );
}
