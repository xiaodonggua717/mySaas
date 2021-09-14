<template>
  <!-- 此文件用作index.vue中树形组件的操作栏组件 -->
  <!-- 放置结构内容 -->
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height:40px;width:100% "
  >
    <!-- 左侧内容 -->
    <el-col>
      <span>
        {{ treeNode.name }}
      </span>
    </el-col>
    <!-- 左侧内容结束 -->
    <!-- 右侧内容 -->
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 -->
          <el-dropdown @command="operateDep">
            <!-- 显示内容 -->
            <span>操作
              <i class="el-icon-arrow-down" />
            </span>
            <!-- 显示内容结束 -->
            <!-- 可选内容 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add" :disabled="checkPermission('add-dept')">
                添加子部门
              </el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="modify">
                编辑该部门
              </el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="delete">
                移除该部门
              </el-dropdown-item>
            </el-dropdown-menu>
            <!-- 可选内容结束 -->
          </el-dropdown>
          <!-- 下拉菜单结束 -->
        </el-col>
      </el-row>
    </el-col>
    <!-- 右侧内容结束 -->
  </el-row>
  <!-- 放置结构内容结束 -->
</template>

<script>
import { delDepartments } from '@/api/department'
export default {
  props: {
    // 定义传入属性
    treeNode: {
      required: true,
      type: Object
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // Elementui的事件触发
    operateDep(type) {
      if (type === 'add') {
        this.$emit('addDepts', this.treeNode)
      } else if (type === 'modify') {
        this.$emit('modifyDepts', this.treeNode)
      } else if (type === 'delete') {
        this.$confirm('您确定要删除该部门吗?').then(() => {
          return delDepartments(this.treeNode.id)
        }).then(() => {
          this.$emit('delDepts')
          this.$message('删除成功')
        })
      }
    }
  }
}
</script>

<style>

</style>
