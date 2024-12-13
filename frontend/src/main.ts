import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import VueAmazingUI from 'vue-amazing-ui'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAmazingUI)

app.mount('#app')
