import request from '@/utils/request'

// 登录接口
export function login(data) {
  // 返回一个Promise对象
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 获取用户资料接口
export function getUserInfo(token) {
  return request({
    url: '/sys/profile',
    method: 'post'

  })
}

// 根据用户Id获取用户详细信息接口
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

export function logout() {

}
