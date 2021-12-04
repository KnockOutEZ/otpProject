import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import VeeValidatePlugin from './includes/validation';
import VueClickAway from "vue3-click-away";
import './store/axios.js';
import CKEditor from '@ckeditor/ckeditor5-vue';
import VueTelInput from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'
import UploadImages from "vue-upload-drop-images";

const app = createApp(App)

app.use(store).component("UploadImages", UploadImages).use(router).use(VeeValidatePlugin).use(VueTelInput).use( CKEditor ).use(VueClickAway).mount('#app')
