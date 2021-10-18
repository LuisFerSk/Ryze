import { Icon } from '@iconify/react';
import schoolIcon from '@iconify/icons-mdi/school';
import bookFill from '@iconify/icons-eva/book-fill';
import clockFill from '@iconify/icons-eva/clock-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import personFill from '@iconify/icons-eva/person-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import openBookFill from '@iconify/icons-eva/book-open-fill';
import briefcaseFill from '@iconify/icons-eva/briefcase-fill';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'periodo academico',
    path: '/dashboard/periodo_academico',
    icon: getIcon(clockFill)
  },
  {
    title: 'facultades',
    path: '/dashboard/facultad',
    icon: getIcon(openBookFill)
  },
  {
    title: 'programas',
    path: '/dashboard/programa',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'asignaturas',
    path: '/dashboard/asignatura',
    icon: getIcon(bookFill)
  },
  {
    title: 'grupos',
    path: '/dashboard/grupo',
    icon: getIcon(peopleFill)
  },
  {
    title: 'estudiantes',
    path: '/dashboard/estudiante',
    icon: getIcon(schoolIcon)
  },
  {
    title: 'profesores',
    path: '/dashboard/profesor',
    icon: getIcon(briefcaseFill)
  },
  {
    title: 'usuarios',
    path: '/dashboard/usuario',
    icon: getIcon(personFill)
  }
];

export default sidebarConfig;
