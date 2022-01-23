import { Navigate, useRoutes } from 'react-router-dom'

import DashboardLayout from './layouts/dashboard'
import LogoOnlyLayout from './layouts/LogoOnlyLayout'

import Login from './pages/Login'
import Grupo from './components/grupo'
import Usuario from './components/usuario'
import NotFound from './pages/Page404'
import Register from './pages/Register'
import Asignatura from './components/asignatura'
import DashboardApp from './pages/DashboardApp'
import PeriodoAcademico from './components/periodoAcademico'
import CircularIndeterminate from './components/shared/Progress'

import { useContextUser } from './components/uses'

const Router = () => {
    const user = useContextUser()

    return useRoutes([
        {
            path: '/dashboard',
            element: user === undefined ? <CircularIndeterminate label='Cargando' /> : !user ? <Navigate to='/' replace /> : <DashboardLayout />,
            children: [
                { path: '/dashboard/', element: <Navigate to='/dashboard/app' replace /> },
                { path: '/dashboard/app', element: <DashboardApp /> },
                { path: '/dashboard/periodo_academico', element: <PeriodoAcademico /> },
                { path: '/dashboard/asignatura', element: <Asignatura /> },
                { path: '/dashboard/grupo', element: <Grupo /> },
                { path: '/dashboard/usuario', element: <Usuario /> },
            ]
        },
        {
            path: '/',
            element: user === undefined ? <CircularIndeterminate label='Cargando' /> : user ? <Navigate to='/dashboard' replace /> : <LogoOnlyLayout />,
            children: [
                { path: '*', element: <NotFound /> },
                { path: '/login', element: <Login /> },
                { path: '/register', element: <Register /> },
                { path: '/', element: <Navigate to='/login' replace /> }
            ]
        },
        { path: '*', element: <NotFound /> },
    ])
}

export default Router;
