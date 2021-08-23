import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Grupo from './pages/Grupo';
import NotFound from './pages/Page404';
import Facultad from './pages/Facultad';
import Programa from './pages/Programa';
import Register from './pages/Register';
import Estudiante from './pages/Estudiante';
import Asignatura from './pages/Asignatura';
import DashboardApp from './pages/DashboardApp';
import PeriodoAcademico from "./pages/PeriodoAcademico";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'periodo_academico', element: <PeriodoAcademico /> },
        { path: 'facultad', element: <Facultad /> },
        { path: 'programa', element: <Programa /> },
        { path: 'asignatura', element: <Asignatura /> },
        { path: 'estudiante', element: <Estudiante /> },
        { path: 'grupo', element: <Grupo /> },
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
