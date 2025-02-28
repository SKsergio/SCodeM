//para pinia solo utilizamos:
import { defineStore } from "pinia";

export const useThemeStore  = defineStore('Theme',{
    //STATES
    state:()=>{ //funcion anonima que retorna los diferentes valores
        return{
            DarkMode: false
        }
    },
    //GETTERS
    getters:{ //estos son objetos
        // times2: (state)=> state.count * 2
    },
    //ACTIONS
    actions:{ //objeto tambien
       toggleDarkMode(){
        this.DarkMode = !this.DarkMode;
       }
    }
})