import { MenuItems } from '../interfaces/templates/MenuInterFace';

import IconCap from '~icons/ri/graduation-cap-fill'
import IdentificationIcon from '~icons/ri/profile-fill'
import InboxIcon from '~icons/ri/shadow-line'
import TrophyIcon from '~icons/ri/trophy-fill'
import CalendarDaysIcon from '~icons/ri/calendar-todo-fill'

export const menuItems: MenuItems[] = [

    {
        label: 'administration',
        roles: ['ADMIN'],
        icon: IdentificationIcon,
        amount: 2,
        hadSoons: true,

        soons: [
            {name: 'TeacherMagnament' }
        ]
    },

    {
        label: 'students',
        roles: ['ADMIN', 'TEACHER'],
        icon: IconCap,
        soons: [
            {name: 'StudentMagnament' },
            {name: 'ManagerMagnament' },
        ],
        amount: 1,
        hadSoons: true
    },

    {
        label: 'degrees',
        roles: ['ADMIN'],
        icon: InboxIcon,
        soons: [
            {  name: 'DegreeMagnament' },
            { name: 'DegreeDetailMagnament' },
            { name: 'SectionMagnament' },
            { name: 'SubjectMagnament' },
        ],

        amount: 4,
        hadSoons: true
    },

    {
        label: 'evaluations',
        roles: ['ADMIN', 'TEACHER', 'STUDENT'],
        icon: TrophyIcon,
        soons: [
            { name: 'EvaluationMagnament' },
        ],

        amount: 3,
        hadSoons: true
    },

    {
        label: 'courses',
        roles: ['ADMIN', 'TEACHER', 'STUDENT'],
        icon: CalendarDaysIcon,
        amount: 2,
        hadSoons: true,
        soons: [
            {  name: 'PeriodMagnament' },
            {  name: 'CourseMagnament' },
        ]
    },
]