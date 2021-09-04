import Layout from '@/layout'
// 员工的路由规则
export default {
  path: '/permission', // 路由地址
  name: 'permission', // 一级路由的name
  component: Layout,
  children: [{
    path: '', // 二级路由不写 目的是让二级路由的组件也直接显示出来
    component: () => import('@/views/permission'),
    meta: {
      title: '权限管理'
    }
  }]
}
