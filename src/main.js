import Vue from 'vue'
import App from './App'
import global from './components/Global' // 全局变量

Vue.config.productionTip = false
const app = new Vue(App)
Vue.prototype.GLOBAL = global
app.$mount()
