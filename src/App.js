// React
import React, { useEffect } from 'react';
// Routes
import Router from './routes';
// Theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// Components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
  );
}
