import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'
import '@mdi/font/css/materialdesignicons.min.css'
 // <---

const app = createApp(App).use(router)

new WaveUI(app,{
    colors: {
        primary: "#6c8693",
        secondary: "#3f51b5"
      }
})



app.mount('#app');
