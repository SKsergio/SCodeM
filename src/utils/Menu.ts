import { MenuItems } from '../interfaces/templates/MenuInterFace';

import IconCap from '~icons/ri/graduation-cap-fill'
import IdentificationIcon from '~icons/ri/profile-fill'
import InboxIcon from '~icons/ri/shadow-line'
import TrophyIcon from '~icons/ri/trophy-fill'
import HandRaisedIcon from '~icons/ri/hand'
import MegaphoneIcon from '~icons/ri/megaphone-fill'
import CalendarDaysIcon from '~icons/ri/calendar-todo-fill'
import ChartPieIcon from '~icons/ri/pie-chart-2-fill'

export const menuItems: MenuItems[]=[
    {
        label:'Administration',
        icon:IdentificationIcon,
        amount:0,
        hadSoons:true,
        soons:[
            {label:'Fyle Types', name:'TypeFileMagnament'}
        ]
    },
    {
        label:'Students',
        icon:IconCap,
        soons:[
            {label:'Studentes',name:'students/pruebas'},
            {label:'Managers',name:'ManagerStudentMagnament'},
            {label:'Academic History',name:'students/pruebasAcademic'},
            {label:'New entry',name:'students/pruebasAcademic2'},
            {label:'Registered',name:'students/pruebasAcademic2'}
        ],
        amount:5,
        hadSoons:true
    },
    {
        label:'Degrees',
        icon:InboxIcon,
        soons:[
            {label:'Degree',name:'DegreeMagnament'},
            {label:'Courses by grade',name:'no hay'},
            {label:'Classrooms',name:'ClassroomsMagnament'},
            {label:'Sections',name:'SectionMagnament'},
            {label:'Subjects',name:'SubjectMagnament'},
        ],
        amount:4,
        hadSoons:true
    },
    {
        label:'Evaluations',
        icon:TrophyIcon,
        soons:[
            {label:'Evaluations', name:'jijija/pruebas'},
            {label:'Types of evaluations', name:'TypeEvaluatioMagnament'},
        ],
        amount:3,
        hadSoons:true
    },
    {
        label:'Attendacne',
        icon:HandRaisedIcon,
        amount:0,
        hadSoons:false
    },
    {
        label:'Notices',
        icon:MegaphoneIcon,
        amount:0,
        hadSoons:false
    }, 
    {
        label:'Schedules',
        icon:CalendarDaysIcon,
        amount:0,
        hadSoons:false
    },
    {
        label:'Reports',
        icon:ChartPieIcon,
        amount:0,
        hadSoons:false
    },
]
