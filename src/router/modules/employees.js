import Layout from '@/layout'
// 员工的路由规则
export default {
  path: '/employees', // 路由地址
  name: 'employees', // 一级路由的name
  component: Layout,
  children: [{
    path: '', // 二级路由不写 目的是让二级路由的组件也直接显示出来
    component: () => import('@/views/employees'),
    meta: {
      title: '员工管理',
      icon: 'people'
    }
  }, { path: 'detail/:id', // query传参 动态路由传参
    component: () => import('@/views/employees/detail'),
    hidden: true, // 不在左侧菜单显示
    meta: {
      title: '员工详情' // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
    }}
  ]
}
