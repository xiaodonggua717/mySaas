import request from '@/utils/request'

export function getEmployeesInfo() {
  return request({
    url: '/sys/user/simple'
  })
}

