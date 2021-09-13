import Layout from '@/layout'
// 审批的路由规则
export default {
  path: '/approvals', // 路由地址
  name: 'approvals', // 一级路由的name
  component: Layout,
  children: [{
    path: '', // 二级路由不写 目的是让二级路由的组件也直接显示出来
    component: () => import('@/views/approvals'),
    meta: {
      title: '审 批',
      icon: 'tree-table'
    }
  }]
}
