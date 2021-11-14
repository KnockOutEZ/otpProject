import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import VeeValidatePlugin from './includes/validation';
import VueClickAway from "vue3-click-away";
import './store/axios.js';

const app = createApp(App)

app.use(store).use(router).use(VeeValidatePlugin).use(VueClickAway).mount('#app')
