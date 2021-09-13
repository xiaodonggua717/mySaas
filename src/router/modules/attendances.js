import Layout from '@/layout'
// 出勤的路由规则
export default {
  path: '/attendances', // 路由地址
  name: 'attendances', // 一级路由的name
  component: Layout,
  children: [{
    path: '', // 二级路由不写 目的是让二级路由的组件也直接显示出来
    component: () => import('@/views/attendances'),
    meta: {
      title: '考 勤',
      icon: 'skill'
    }
  }]
}
