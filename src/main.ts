import { createApp, markRaw } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
//@ts-ignore
import Wind from '@/presets/wind';
import { createPinia } from 'pinia';
import router from '@/router/router';

const app = createApp(App)
const pinia = createPinia()
pinia.use(({ store }) => {
    store.router = markRaw(router)
})
app.use(PrimeVue, {
    unstyled: true,
    pt: Wind
})
    .use(pinia)
    .use(router)

app.mount('#app')
