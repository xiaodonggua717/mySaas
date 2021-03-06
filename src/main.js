import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css
import Components from '@/components'
import App from './App'
import store from './store'
import router from './router'
import checkPermission from './mixin/checkPermission'
import * as directives from '@/directives'
import '@/icons' // icon
import '@/permission' // permission control
import * as filters from '@/filters'
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

// 注册自定义组件
Vue.use(Components)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key]) // 注册自定义指令
})
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]) // 注册过滤器
})
Vue.config.productionTip = false
// 全局混入检查对象
Vue.mixin(checkPermission)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
