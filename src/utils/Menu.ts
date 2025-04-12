import { MenuItems } from './../interfaces/MenuInterFace';
import {AcademicCapIcon, IdentificationIcon, InboxIcon,
    HandRaisedIcon, MegaphoneIcon, CalendarDaysIcon, ChartPieIcon, TrophyIcon} from '@heroicons/vue/24/solid';

export const menuItems: MenuItems[]=[
    {
        label:'Administration',
        icon:IdentificationIcon,
        amount:0,
        hadSoons:false
    },
    {
        label:'Students',
        icon:AcademicCapIcon,
        soons:[
            {label:'Studentes',url:'students/pruebas'},
            {label:'Parents',url:'students/pruebasParents'},
            {label:'Academic History',url:'students/pruebasAcademic'},
            {label:'New entry',url:'students/pruebasAcademic2'},
            {label:'Registered',url:'students/pruebasAcademic2'}
        ],
        amount:5,
        hadSoons:true
    },
    {
        label:'Degrees',
        icon:InboxIcon,
        soons:[
            {label:'Degree',url:'Degrees/pruebas'},
            {label:'Courses by grade',url:'Degrees/pruebas'},
            {label:'Classrooms',url:'Degrees/pruebas'},
            {label:'Sections',url:'Degrees/pruebas'},
        ],
        amount:4,
        hadSoons:true
    },
    {
        label:'Evaluations',
        icon:TrophyIcon,
        soons:[
            {label:'Evaluations', url:'jijija/pruebas'},
            {label:'Types of evaluations', url:'jijija/pruebas'},
            {label:'Periods', url:'periodos/pruebas'}
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
