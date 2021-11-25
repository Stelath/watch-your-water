import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import MainRoutes from './Routes';
import './index.css';

ReactDOM.render(
  <Router>
    <MainRoutes />
  </Router>,
  document.getElementById('root')
);
