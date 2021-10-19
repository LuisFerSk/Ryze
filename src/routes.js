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
import Profesor from "./pages/Profesor";
import Estudiante from './pages/Estudiante';
import Asignatura from './pages/Asignatura';
import DashboardApp from './pages/DashboardApp';
import PeriodoAcademico from "./pages/PeriodoAcademico";
import CircularIndeterminate from './components/shared/Progress';

import ControlUser from "./components/shared/ControlUser";

// ----------------------------------------------------------------------

const Router = () => {
	const user = ControlUser();
	return useRoutes([
		{
			path: '/dashboard',
			element: user === undefined ? <CircularIndeterminate /> : !user ? <Navigate to="/" replace /> : <DashboardLayout />,
			children: [
				{ path: '/', element: <Navigate to="/dashboard/app" replace /> },
				{ path: 'app', element: <DashboardApp /> },
				{ path: 'periodo_academico', element: <PeriodoAcademico /> },
				{ path: 'facultad', element: <Facultad /> },
				{ path: 'programa', element: <Programa /> },
				{ path: 'asignatura', element: <Asignatura /> },
				{ path: 'estudiante', element: <Estudiante /> },
				{ path: 'grupo', element: <Grupo /> },
				{ path: 'profesor', element: <Profesor /> },
			]
		},
		{
			path: '/',
			element: user === undefined ? <CircularIndeterminate /> : user ? <Navigate to="/dashboard" replace /> : <LogoOnlyLayout />,
			children: [
				{ path: '*', element: <NotFound /> },
				{ path: 'login', element: <Login /> },
				{ path: 'register', element: <Register /> },
				{ path: '/', element: <Navigate to="/login" replace /> }
			]
		},
		{ path: '*', element: <NotFound /> }
	]);
}

export default Router;
