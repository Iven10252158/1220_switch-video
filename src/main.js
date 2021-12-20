import { createApp } from 'vue'
import YouTube from 'vue3-youtube'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.component('YouTube', YouTube)
app.use(router)
app.mount('#app')
