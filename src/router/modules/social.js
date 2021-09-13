import Layout from '@/layout'
// 社保的路由规则
export default {
  path: '/social', // 路由地址
  name: 'social_securitys', // 一级路由的name
  component: Layout,
  children: [{
    path: '', // 二级路由不写 目的是让二级路由的组件也直接显示出来
    component: () => import('@/views/social'),
    meta: {
      title: '社 保',
      icon: 'table'
    }
  }]
}
