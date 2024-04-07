import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import VueGoogleMaps1 from '@fawmi/vue-google-maps'
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(VueGoogleMaps1, {
    load : {
        key : '#',
        libraries: "places"
    },
})
app.mount('#app')
