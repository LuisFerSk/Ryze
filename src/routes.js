import { Navigate, useRoutes } from 'react-router-dom'
// layouts
import DashboardLayout from './layouts/dashboard'
import LogoOnlyLayout from './layouts/LogoOnlyLayout'
//
import Login from './pages/Login'
import Grupo from './components/grupo'
import Usuario from './components/usuario'
import NotFound from './pages/Page404'
import Register from './pages/Register'
import Asignatura from './components/asignatura'
import DashboardApp from './pages/DashboardApp'
import PeriodoAcademico from './components/periodoAcademico'
import CircularIndeterminate from './components/shared/Progress'

import useUser from './components/uses/useUser'

// ----------------------------------------------------------------------

const Router = () => {
	const user = useUser()
	return useRoutes([
		{
			path: '/dashboard',
			element: user === undefined ? <CircularIndeterminate label='Cargando' /> : !user ? <Navigate to='/' replace /> : <DashboardLayout />,
			children: [
				{ path: '/', element: <Navigate to='/dashboard/app' replace /> },
				{ path: 'app', element: <DashboardApp /> },
				{ path: 'periodo_academico', element: <PeriodoAcademico /> },
				{ path: 'asignatura', element: <Asignatura /> },
				{ path: 'grupo', element: <Grupo /> },
				{ path: 'usuario', element: <Usuario /> },
			]
		},
		{
			path: '/',
			element: user === undefined ? <CircularIndeterminate label='Cargando' /> : user ? <Navigate to='/dashboard' replace /> : <LogoOnlyLayout />,
			children: [
				{ path: '*', element: <NotFound /> },
				{ path: 'login', element: <Login /> },
				{ path: 'register', element: <Register /> },
				{ path: '/', element: <Navigate to='/login' replace /> }
			]
		},
		{ path: '*', element: <NotFound /> }
	])
}

export default Router;
