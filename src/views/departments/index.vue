<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容-->
      <el-card class="tree-card">
        <tree-tools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <!-- 放一个el-tree -->
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <!-- 将值传给treenode -->
          <tree-tools slot-scope="{data}" :tree-node="data" @delDepts="getDepartments" @modifyDepts="modifyDepts" @addDepts="addDepts" />
        </el-tree>
      </el-card>
      <!-- 组织架构内容结束 -->
      <add-departments ref="addDept" :show-dialog.sync="showdialog" :tree-node="node" @addDepts="getDepartments" /></div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDepartments } from '@/api/department'
import { tranlistToTreeData } from '@/utils'
import AddDepartments from './components/add-dept.vue'
export default {
  components: {
    TreeTools, AddDepartments
  },
  data() {
    return {
      showdialog: false,
      node: null,
      // 此处是获取api数据失败时的默认数据
      company: {
        name: 'xiaodonggua的公司', manager: '负责人'
      },
      departs: [
        { name: '总裁办', manager: '贝拉', children: [{ name: '董事会', manager: '珈乐' }] },
        { name: '行政部', manager: '乃琳' },
        { name: '人事部', manager: '嘉然' }
      ],
      defaultProps: {
        label: 'name',
        children: 'children'
      }
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments()
      for (let i = 1; i < result.depts.length; i++) {
        result.depts[i].manager = '阿草' + i + '号'
      }
      result.depts[0].manager = 'xiaodonggua'
      result.depts[10].name = '前端开发部门'
      result.depts[11].name = '后端开发部门'
      result.depts[12].name = '测试部门'
      result.companyName = 'xiaodonggua测试用'
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      this.departs = tranlistToTreeData(result.depts, '')
      // console.log(result)
      // console.log(1)
    },
    addDepts(node) {
      this.showdialog = true
      this.node = node
    },
    modifyDepts(node) {
      this.showdialog = true
      this.node = node
      this.$refs.addDept.getDepartDetail(node.id)
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
