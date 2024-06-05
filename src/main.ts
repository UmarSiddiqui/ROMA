import { createApp } from 'vue'
import Vue3Lottie from 'vue3-lottie'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'  // Import Vuetify

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.use(Vue3Lottie)  // Use Vuetify

app.mount('#app')
