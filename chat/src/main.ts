/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

import {store, key} from '@/store/store'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

app.use(store, key);

registerPlugins(app)

app.mount('#app')
