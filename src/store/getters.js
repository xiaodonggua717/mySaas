const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token, // 用户token
  username: state => state.user.userInfo.username, // 用户名
  userId: state => state.user.userInfo.userId, // 用户ID
  staffPhoto: state => state.user.userInfo.staffPhoto, // 用户头像
  companyId: state => state.user.userInfo.companyId, // 公司的id
  routes: state => state.permission.routes // 导出当前的路由
}
export default getters
