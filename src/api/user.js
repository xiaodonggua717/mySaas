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

export function getInfo(token) {

}

export function logout() {

}
