import { createApp } from 'vue'
import "./style.css"
import App from './App.vue'
// import './samples/node-api'
import router from './router'

import './assets/iconfont/iconfont.css' // iconfont图表字体
import '@/libs/echarts' // 引入echarts相关配置

const app = createApp(App)

app.use(router) // 注册路由

app.mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
