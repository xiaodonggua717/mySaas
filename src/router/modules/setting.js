import Layout from '@/layout'
// 设置的路由规则
export default {
  path: '/setting', // 路由地址
  name: 'settings', // 一级路由的name
  component: Layout,
  children: [{
    path: '', // 二级路由不写 目的是让二级路由的组件也直接显示出来
    component: () => import('@/views/setting'),
    meta: {
      title: '设 置',
      icon: 'setting'
    }
  }]
}
