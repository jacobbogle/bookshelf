import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import WaveUI from 'wave-ui'
 // <---

const app = createApp(App).use(router)

new WaveUI(app,{

})

app.mount('#app');
