import { createSSRApp } from 'vue'
import App from './App.vue'
import router from './router'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'
import '@mdi/font/css/materialdesignicons.min.css'

 // <---
//  edit
const app = createSSRApp(App)

new WaveUI(app, {
  // Some Wave UI options.
  colors: {
    primary: '#3f51b5',
    secondary: '#e3f2fd'
  }
})
app.use(router)
app.mount('#app');



// // app.js (shared between server and client)
// import { createSSRApp } from 'vue'

// export function createApp() {
//   return createSSRApp(App)
// }

