import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/el'
import './assets/global.css'
import * as echarts from 'echarts'
import 'echarts/map/js/china'
import 'echarts/map/js/world'
import './assets/map'

axios.defaults.baseURL="http://127.0.0.1:5000/"
axios.interceptors.request.use(config=>{
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})
Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

