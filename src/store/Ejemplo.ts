//para pinia solo utilizamos:
import { defineStore } from "pinia";

export const useEjemploStore = defineStore('Ejemplo',{
    //STATES
    state:()=>{ //funcion anonima que retorna los diferentes valores
        return{
            count:1
        }
    },
    //GETTERS
    getters:{ //estos son objetos
        times2: (state)=> state.count * 2
    },
    //ACTIONS
    actions:{ //objeto tambien
        increment(value = 1){
            this.count += value
        }
    }
})
