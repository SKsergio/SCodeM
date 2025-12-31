import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'


// estilos propios
import './css/normalice.css'
import './css/layaout.css'
import './css/globalClases.css'
import './css/alertDelete.css'
import './css/modales.css'

const app = createApp(App)
const pinia = createPinia()

app
  .use(router)
  .use(pinia)
  .mount('#app')
