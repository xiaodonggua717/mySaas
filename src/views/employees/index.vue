<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <!-- 左侧为总记录数 -->
        <span slot="before">共{{ page.total }}条记录</span>
        <!-- 右侧为按钮: excel导出 导入 新增员工 -->
        <template v-slot:after>
          <el-button
            type="success"
            @click="$router.push('/import')"
          >excel导入</el-button>
          <el-button type="danger" @click="exportData">excel导出</el-button>
          <el-button
            type="primary"
            @click="showDialog = true"
          >新增员工</el-button>
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table v-loading="loading" border :data="list">
          <!-- 表格 -->
          <el-table-column
            type="index"
            align="center"
            label="序号"
            sortable=""
          />
          <el-table-column
            prop="username"
            align="center"
            label="姓名"
            sortable=""
          />
          <el-table-column
            prop="workNumber"
            align="center"
            label="工号"
            sortable=""
          />
          <el-table-column
            prop="formOfEmployment"
            align="center"
            label="聘用形式"
            :formatter="formatEmployment"
            sortable=""
          />
          <el-table-column
            prop="departmentName"
            align="center"
            label="部门"
            sortable=""
          />
          <el-table-column
            label="入职时间"
            sortable
            prop="timeOfEntry"
            align="center"
          >
            <template slot-scope="obj">
              {{ obj.row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column
            label="账户状态"
            align="center"
            sortable=""
            prop="enableState"
          >
            <template slot-scope="{ row }">
              <!-- 根据当前状态来确定 是否打开开关 -->
              <el-switch :value="row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            fixed="right"
            width="280"
          >
            <template slot-scope="{ row }">
              <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button
                type="text"
                size="small"
                @click="deleteEmployee(row.id)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="prev, pager, next"
            :current-page="page.page"
            :page-size="page.size"
            :total="page.total"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>
    <add-employee :show-dialog.sync="showDialog" />
  </div>
</template>

<script>
import EmployeeEnum from '@/api/constant/employees'
import AddEmployee from './components/add-employee.vue'
import { getEmployeeList, delEmployee } from '@/api/employees'
import { formatDate } from '@/filters'
export default {
  components: {
    AddEmployee
  },
  data() {
    return {
      list: [], // 接受数组
      // 从接口文档中得知变量名
      page: {
        page: 1,
        size: 10,
        total: 0
      },
      loading: false,
      showDialog: false
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      const { total, rows } = await getEmployeeList(this.page)
      this.page.total = total
      this.list = rows
      this.loading = false
    },
    changePage(newPage) {
      this.page.page = newPage
      this.getEmployeeList()
    },
    // 将api传来的数据进行格式化
    formatEmployment(row, column, cellValue, index) {
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    async deleteEmployee(id) {
      try {
        await this.$confirm('您确定删除该员工吗')
        await delEmployee(id)
        this.getEmployeeList()
        this.$message.success('删除员工成功')
      } catch (error) {
        console.log(error)
      }
    },
    exportData() {
      // 导出excel
      const headers = {
        手机号: 'mobile',
        姓名: 'username',
        入职日期: 'timeOfEntry',
        聘用形式: 'formOfEmployment',
        转正日期: 'correctionTime',
        工号: 'workNumber',
        部门: 'departmentName'
      }
      import('@/vendor/Export2Excel').then(async excel => {
        const { rows } = await getEmployeeList({
          page: 1,
          size: this.page.total
        })
        const data = this.formatJson(headers, rows)
        excel.export_json_to_excel({
          header: Object.keys(headers), // 表头 必填
          data,
          filename: '员工信息表'
        })
      })
    },
    formatJson(headers, rows) {
      // 首先遍历数组
      // [{ username: '张三'},{},{}]  => [[’张三'],[],[]]
      return rows.map(item => {
        return Object.keys(headers).map(key => {
          if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
            return formatDate(item[headers[key]]) // 返回格式化之前的时间
          } else if (headers[key] === 'formOfEmployment') {
            var obj = EmployeeEnum.hireType.find(obj => obj.id === item[headers[key]])
            return obj ? obj.value : '未知'
          }
          return item[headers[key]]
        }) // => ["张三", "13811"，"2018","1", "2018", "10002"]
      })
    }
  }
}
</script>

<style></style>
