import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Home from './pages/Home';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Leaderboard from './pages/Leaderboard';
import NotFound from './pages/Page404';
//
import AuthCheckRoute from './components/AuthCheckRoute';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <Navigate to="/dashboard/app" /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'leaderboard', element: <Leaderboard /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <AuthCheckRoute to="/dashboard/app" secondary="/home" /> },
        { path: 'home', element: <Home /> },
        { path: 'settings', element: <Settings /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
