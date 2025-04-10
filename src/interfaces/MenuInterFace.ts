import type { Component } from 'vue';

//hijos de los menus(submenus)
export interface SoonsItems{
    label:string,
    url:string
}

//items del menu
export interface MenuItems{
    label:string,
    icon:Component,
    soons?: SoonsItems[],//tipado como un array
    amount:number, //cantidad de hijos o submenus
    hadSoons: boolean //si contiene hijos o no
}
