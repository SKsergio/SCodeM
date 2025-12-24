import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'

// estilos propios
import './css/normalice.css'
import './css/layaout.css'
import './css/globalClases.css'
import './css/alertDelete.css'

const app = createApp(App)
const pinia = createPinia()
const vfm = createVfm()

app
  .use(router)
  .use(pinia)
  .use(vfm)
  .mount('#app')
