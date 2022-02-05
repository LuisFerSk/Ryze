import { Navigate, useRoutes } from 'react-router-dom'

import DashboardLayout from './layouts/dashboard'
import LogoOnlyLayout from './layouts/LogoOnlyLayout'

import Login from './pages/Login'
import Grupo from './components/grupo'
import NotFound from './pages/Page404'
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

    const elementOnlyForAdmin = (element) => {
        if (isObject(user) && user.data.tipo === ADMINISTRADOR) {
            return element;
        }
        return <Navigate to='/404' replace />
    }

    const elementAccordingToUserLogin = (elementUserLoggedIn, elementUserLoggedOut) => {
        if (user === undefined) {
            return <CircularIndeterminate label='Cargando' />
        }

        if (user) {
            return elementUserLoggedIn;
        }

        return elementUserLoggedIn;
    }

    return useRoutes([
        {
            path: '/dashboard',
            element: elementAccordingToUserLogin(<DashboardLayout />, <Navigate to='/' replace />),
            children: [
                { path: '/dashboard/app', element: <DashboardApp /> },
                { path: '/dashboard/', element: <Navigate to='/dashboard/app' replace /> },
                { path: '/dashboard/grupo', element: <Grupo /> },
                { path: '/dashboard/usuario', element: elementOnlyForAdmin(<Usuario />) },
                { path: '/dashboard/asignatura', element: elementOnlyForAdmin(<Asignatura />) },
                { path: '/dashboard/matricula', element: elementOnlyForAdmin(<MatriculaCademica />) },
                { path: '/dashboard/periodo_academico', element: elementOnlyForAdmin(<PeriodoAcademico />) },
                { path: '/dashboard/asistencia/:grupo', element: <Asistencia /> },
            ]
        },
        {
            path: '/',
            element: elementAccordingToUserLogin(<Navigate to='/dashboard' replace />, <LogoOnlyLayout />),
            children: [
                { path: '/login', element: <Login /> },
                { path: '/', element: <Navigate to='/login' replace /> }
            ]
        },
        { path: '*', element: <Navigate to='/404' replace /> },
        { path: '/404', element: <NotFound /> }
    ])
}

export default Router;
