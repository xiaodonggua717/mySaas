import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { resetRouter } from '@/router'
const state = {
  token: getToken(), // 设置token为共享状态
  userInfo: {} // 不设置成null而是空对象的原因是 在getters会引用userInfo的值 如果是null会引起异常和报错
}
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  setUserInfo(state, result) {
    state.userInfo = result // 响应式 将用户资料信息存到state里
  },
  removeUserInfor(state) {
    state.userInfo = {}
  }
}
const actions = {
  async login(context, data) {
    const result = await login(data)
    context.commit('setToken', result)
    setTimeStamp()
  },
  async getUserInfo(context) {
    const result = await getUserInfo() // 获取用户资料
    const baseInfo = await getUserDetailById(result.userId)
    const baseResult = { ...result, ...baseInfo } // 将详情信息和基础信息合并
    context.commit('setUserInfo', baseResult) // 提交用户资料到mutation
    return baseResult // 这里是用作权限处理返回 result
  },
  logout(context) {
    // 删除Token
    context.commit('removeToken')
    // 删除用户信息
    context.commit('removeUserInfor')
    resetRouter() // 重置路由
    // 去设置权限模块下路由为初始状态
    // 不加命名空间的情况下所有的mutation和action都是挂在全局下的 但是加了命名空间的不行
    // 子模块调用子模块
    context.commit('permission/setRoutes', [], { root: true })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
