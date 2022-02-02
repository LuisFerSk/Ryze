import { Icon } from '@iconify/react'
import bookFill from '@iconify/icons-eva/book-fill'
import clockFill from '@iconify/icons-eva/clock-fill'
import dipSwitch from '@iconify/icons-mdi/dip-switch'
import peopleFill from '@iconify/icons-eva/people-fill'
import personFill from '@iconify/icons-eva/person-fill'
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill'

const getIcon = (name) => <Icon icon={name} width={22} height={22} />

export const sidebarConfigAdministrador = [
    {
        title: 'dashboard',
        path: '/dashboard/app',
        icon: getIcon(pieChart2Fill),
    },
    {
        title: 'periodo academico',
        path: '/dashboard/periodo_academico',
        icon: getIcon(clockFill),
    },
    {
        title: 'asignaturas',
        path: '/dashboard/asignatura',
        icon: getIcon(bookFill),
    },
    {
        title: 'grupos',
        path: '/dashboard/grupo',
        icon: getIcon(peopleFill),
    },
    {
        title: 'matricula academica',
        path: '/dashboard/matricula',
        icon: getIcon(dipSwitch),
    },
    {
        title: 'usuarios',
        path: '/dashboard/usuario',
        icon: getIcon(personFill),
    }
]

export const sidebarConfigEstudiante = [
    {
        title: 'matricula academica',
        path: '/dashboard/matricula',
        icon: getIcon(dipSwitch),
    },
]

export const sidebarConfigProfesor = [
    {
        title: 'grupos',
        path: '/dashboard/grupo',
        icon: getIcon(peopleFill),
    },
]
