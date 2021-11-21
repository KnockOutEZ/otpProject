import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import VeeValidatePlugin from './includes/validation';
import VueClickAway from "vue3-click-away";
import './store/axios.js';
import CKEditor from '@ckeditor/ckeditor5-vue';

const app = createApp(App)

app.use(store).use(router).use(VeeValidatePlugin).use( CKEditor ).use(VueClickAway).mount('#app')
