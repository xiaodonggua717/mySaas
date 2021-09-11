<template>
  <upload-excel :on-success="success" />
</template>

<script>
import { importEmployee } from '@/api/employees'
export default {
  methods: {
    async success({ header, results }) {
      // header中的数据 是中文
      // result的数据也是中文
      // 如果是导入员工
      const userRelations = {
        入职日期: 'timeOfEntry',
        手机号: 'mobile',
        姓名: 'username',
        转正日期: 'correctionTime',
        工号: 'workNumber'
      }
      const arr = []
      results.forEach(item => {
        // 将中文倒成需要的变量名
        const userInfo = {}
        Object.keys(item).forEach(key => {
          userInfo[userRelations[key]] = item[key]
        })
        arr.push(userInfo)
      })
      await importEmployee(arr) // 调用导入接口
      this.$message.success('导入excel成功')
      this.$router.back()
    }
  }
}
</script>

<style></style>
