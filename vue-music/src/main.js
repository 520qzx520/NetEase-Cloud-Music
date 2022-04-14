
import { createApp } from 'vue'
import App from './App.vue'

//路由
import router from './router'
//公共样式
import './assets/css/common.css'
//引入移动端适配的js文件
// import './assets/js/phone.js'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//懒加载图片
import lazyPlugin from 'vue3-lazy'

import img from './assets/img/lazyload.gif'


import store from './store'
import eventHub from './eventbus/index'

const Vue = createApp(App)
Vue.use(lazyPlugin, {
  loading: img   // 图片加载时默认图片

})
Vue.use(router)
Vue.use(ElementPlus)
Vue.use(store)
Vue.config.globalProperties.eventHub = eventHub
Vue.mount('#app')



