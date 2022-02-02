import { Navigate, useRoutes } from 'react-router-dom'

import DashboardLayout from './layouts/dashboard'
import LogoOnlyLayout from './layouts/LogoOnlyLayout'

import Login from './pages/Login'
import Grupo from './components/grupo'
import NotFound from './pages/Page404'
import Register from './pages/Register'
import Usuario from './components/usuario'
import DashboardApp from './pages/DashboardApp'
import Asignatura from './components/asignatura'
import Asistencia from './components/asistencia'
import PeriodoAcademico from './components/periodoAcademico'
import MatriculaCademica from './components/matriculaAcademica'
import CircularIndeterminate from './components/shared/Progress'

import { ADMINISTRADOR } from './_mocks_/roles'
import { useContextUser } from './components/uses'
import { isObject } from './utils/specialFunctions'

const Router = () => {
    const user = useContextUser()

    return useRoutes([
        {
            path: '/dashboard',
            element: user === undefined ? <CircularIndeterminate label='Cargando' /> : !user ? <Navigate to='/' replace /> : <DashboardLayout />,
            children: [
                { path: '/dashboard/app', element: <DashboardApp /> },
                { path: '/dashboard/', element: <Navigate to='/dashboard/app' replace /> },
                { path: '/dashboard/grupo', element: <Grupo /> },
                { path: '/dashboard/usuario', element: isObject(user) && user.data.tipo === ADMINISTRADOR ? < Usuario /> : <Navigate to='/404' replace /> },
                { path: '/dashboard/asignatura', element: isObject(user) && user.data.tipo === ADMINISTRADOR ? <Asignatura /> : <Navigate to='/404' replace /> },
                { path: '/dashboard/matricula', element: isObject(user) && user.data.tipo === ADMINISTRADOR ? <MatriculaCademica /> : <Navigate to='/404' replace /> },
                { path: '/dashboard/periodo_academico', element: isObject(user) && user.data.tipo === ADMINISTRADOR ? <PeriodoAcademico /> : <Navigate to='/404' replace /> },
                { path: '/dashboard/asistencia/:grupo', element: <Asistencia /> },
            ]
        },
        {
            path: '/',
            element: user === undefined ? <CircularIndeterminate label='Cargando' /> : user ? <Navigate to='/dashboard' replace /> : <LogoOnlyLayout />,
            children: [
                { path: '/login', element: <Login /> },
                { path: '/register', element: <Register /> },
                { path: '/', element: <Navigate to='/login' replace /> }
            ]
        },
        { path: '*', element: <Navigate to='/404' replace /> },
        { path: '/404', element: <NotFound /> }
    ])
}

export default Router;
