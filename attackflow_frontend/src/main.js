import App from './App.vue'
import router from '@/router';
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/css/global.css';
import '@fortawesome/fontawesome-free/css/all.css';
const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.mount('#app')
