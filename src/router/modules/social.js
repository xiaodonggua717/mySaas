import Layout from '@/layout'
// 员工的路由规则
export default {
  path: '/social', // 路由地址
  name: 'social', // 一级路由的name
  component: Layout,
  children: [{
    path: '', // 二级路由不写 目的是让二级路由的组件也直接显示出来
    component: () => import('@/views/social'),
    meta: {
      title: '社保'
    }
  }]
}