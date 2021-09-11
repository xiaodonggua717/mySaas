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

// 新增员工
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

// 导入员工数据 参数data是一个数组类型
export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}
