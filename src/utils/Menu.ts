import { MenuItems } from '../interfaces/templates/MenuInterFace';

import IconCap from '~icons/ri/graduation-cap-fill'
import IdentificationIcon from '~icons/ri/profile-fill'
import InboxIcon from '~icons/ri/shadow-line'
import TrophyIcon from '~icons/ri/trophy-fill'
import CalendarDaysIcon from '~icons/ri/calendar-todo-fill'

export const menuItems: MenuItems[] = [

    {
        label: 'Administracion',
        roles: ['ADMIN'],
        icon: IdentificationIcon,
        amount: 2,
        hadSoons: true,

        soons: [
            { label: 'Maestros', name: 'TeacherMagnament' }
        ]
    },

    {
        label: 'Estudiantes',
        roles: ['ADMIN', 'TEACHER'],
        icon: IconCap,
        soons: [
            { label: 'Estudiantes', name: 'StudentMagnament' },
        ],
        amount: 1,
        hadSoons: true
    },

    {
        label: 'Grados',
        roles: ['ADMIN'],
        icon: InboxIcon,
        soons: [
            { label: 'Grados', name: 'DegreeMagnament' },
            { label: 'Grados Específicos', name: 'DegreeDetailMagnament' },
            { label: 'Secciones', name: 'SectionMagnament' },
            { label: 'Asignaturas', name: 'SubjectMagnament' },
        ],

        amount: 4,
        hadSoons: true
    },

    {
        label: 'Evaluaciones',
        roles: ['ADMIN', 'TEACHER', 'STUDENT'],
        icon: TrophyIcon,
        soons: [
            { label: 'Evaluaciones', name: 'EvaluationMagnament' },
        ],

        amount: 3,
        hadSoons: true
    },

    {
        label: 'Cursos',
        roles: ['ADMIN', 'TEACHER', 'STUDENT'],
        icon: CalendarDaysIcon,
        amount: 2,
        hadSoons: true,
        soons: [
            { label: 'Periodos', name: 'PeriodMagnament' },
            { label: 'Cursos', name: 'CourseMagnament' },
        ]
    },
]