import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'  // Import Vuetify

const app = createApp(App)

app.use(router)
app.use(vuetify)  // Use Vuetify

app.mount('#app')
