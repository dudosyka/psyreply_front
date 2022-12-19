import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import VueApexCharts from "vue3-apexcharts";
import components from '@/components/UI/index'

const app = createApp(App)

components.forEach(component => app.component(component.name, component))

app
  .use(store)
  .use(router)
  .use(VueApexCharts)
  .mount('#app')
