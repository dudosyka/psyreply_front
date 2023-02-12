import { createApp } from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons';
import router from './router'
import store from './store'
import 'animate.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

library.add(fas)

createApp(App).use(store).use(router).use(VueRouter).component('fa', FontAwesomeIcon).mount('#app')

