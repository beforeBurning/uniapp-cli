import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

// vuex
import store from './store'
Vue.prototype.$store = store

import {
	http
} from '@/api/service.js' // 全局挂载引入，配置相关在该index.js文件里修改
Vue.prototype.$http = http

const app = new Vue({
	store,
	...App
})
app.$mount()
