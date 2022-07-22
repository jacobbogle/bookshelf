import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Chat from 'vue3-beautiful-chat'
 // <---

createApp(App).use(router, Chat).mount('#app');
