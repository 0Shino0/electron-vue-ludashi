import { createApp } from 'vue'
import "./style.css"
import App from './App.vue'
// import './samples/node-api'

import './assets/iconfont/iconfont.css' // iconfont图表字体

createApp(App)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
