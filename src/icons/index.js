import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// 全局注册
Vue.component('svg-icon', SvgIcon)

// 引用全部svg文件
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
