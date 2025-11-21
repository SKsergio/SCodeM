import { MenuItems } from '../interfaces/templates/MenuInterFace';
import {AcademicCapIcon, IdentificationIcon, InboxIcon,
    HandRaisedIcon, MegaphoneIcon, CalendarDaysIcon, ChartPieIcon, TrophyIcon} from '@heroicons/vue/24/solid';

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
        icon:AcademicCapIcon,
        soons:[
            {label:'Studentes',name:'students/pruebas'},
            {label:'Parents',name:'students/pruebasParents'},
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
