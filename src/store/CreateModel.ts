import { defineStore } from 'pinia';

export const useModalStore = defineStore('Modal', {
    state: () => ({
        showModal: false,
    }),
    actions:{
        showCreateModal(){
            this.showModal = true
        },
        HideCreateModal(){
            this.showModal = false
        }
    }
})