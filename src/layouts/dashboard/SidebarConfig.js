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
    path: '/404',
    icon: getIcon(clockFill)
  },
  {
    title: 'facultades',
    path: '/404',
    icon: getIcon(openBookFill)
  },
  {
    title: 'programas',
    path: '/404',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'asignaturas',
    path: '/404',
    icon: getIcon(bookFill)
  },
  {
    title: 'grupo',
    path: '/404',
    icon: getIcon(peopleFill)
  },
  {
    title: 'estudiantes',
    path: '/404',
    icon: getIcon(schoolIcon)
  },
  {
    title: 'profesores',
    path: '/404',
    icon: getIcon(briefcaseFill)
  },
  {
    title: 'usuarios',
    path: '/404',
    icon: getIcon(personFill)
  }
];

export default sidebarConfig;
