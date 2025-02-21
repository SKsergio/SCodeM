import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//importar estilos
import '../src/css/normalice.css'
import '../src/css/layaout.css'


createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
