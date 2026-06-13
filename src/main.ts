import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import VueAwesomePaginate from 'vue-awesome-paginate'
import { createI18n } from 'vue-i18n'

//idiomas
import es from './locals/es.json';
import en from './locals/en.json';

const i18n = createI18n({
  locale: 'es',
  fallbackLocale: 'en', 
  messages: {
    es,
    en
  }
});

// estilos propios
import './css/normalice.css'
import './css/layaout.css'
import './css/globalClases.css'
import './css/alertDelete.css'
import './css/modales.css'
import 'vue-awesome-paginate/dist/style.css'
import './css/login.css'

const app = createApp(App)
const pinia = createPinia()

app
  .use(router)
  .use(i18n)
  .use(pinia)
  .use(VueAwesomePaginate)
  .mount('#app')
