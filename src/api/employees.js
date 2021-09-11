import request from '@/utils/request'

// 获取员工信息
export function getEmployeesInfo() {
  return request({
    url: '/sys/user/simple'
  })
}

// 获取员工列表
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

// 删除员工
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
