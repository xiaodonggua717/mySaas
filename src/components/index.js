// 负责所有全局自定义组件的注册
import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel) // 注册导入excel组件
  }
}

// Vue.use()会调用install()
