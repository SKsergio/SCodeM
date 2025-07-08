import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

//importar estilos
import '../src/css/normalice.css'
import '../src/css/layaout.css'
import '../src/css/alertDelete.css'

// utilizanod pinia
const pinia = createPinia()

createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')
    
