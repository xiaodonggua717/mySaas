// 负责所有全局自定义组件的注册
import PageTools from './PageTools'
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
  }
}

// Vue.use()会调用install()
