<template>
  <el-dialog :title="showTitle" :visible="showDialog" @close="btnCancel">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="deptForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <!-- native修饰符 -->
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployeesInfo">
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduction">
        <el-input v-model="formData.introduction" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnSure">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { addDepartments, getDepartments, getDepartDetail, updateDepartments } from '@/api/department'
import { validDeptsIntroduction } from '@/utils/validate'
import { getEmployeesInfo } from '@/api/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    const validateDeptsName = async(rule, value, callback) => {
      // 返回值中depts为数组名 此时可以直接使用解构赋值
      const { depts } = await getDepartments()
      const isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      // 去找子级中是否有与新的子部门相同名称的
      isRepeat ? callback(new Error(`同级部门下已经存在"${value}"部门了`)) : callback()
    }
    const validateDeptsCode = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      //   有时api传来的值可能会出现code为空的情况 所以加一个强制条件
      const isRepeat = depts.some(item => item.code === value && value)
      isRepeat ? callback(new Error(`同级部门下已经存在"${value}"编码的部门了`)) : callback()
    }
    const validateDeptsIntroduction = (rule, value, callback) => {
      validDeptsIntroduction(value) ? callback() : callback(new Error('部门介绍应在三百字符以内'))
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduction: ''
      },
      rules: {
        name: [{ required: true, message: '部门名不能为空', trigger: 'blur' }, { min: 1, max: 50, message: '部门名称应在五十字符以内', trigger: 'blur' }, { validator: validateDeptsName, trigger: 'blur' }],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' }, { min: 1, max: 50, message: '部门编码应在五十字符以内', trigger: 'blur' }, { validator: validateDeptsCode, trigger: 'blur' }],
        manager: [{ required: true, message: '部门管理不能为空', trigger: 'blur' }],
        introduction: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' }, { validator: validateDeptsIntroduction, trigger: 'blur' }]
      },
      peoples: []
    }
  },
  computed: { showTitle() {
    return this.formData.id ? '编辑部门' : '新增部门'
  } },
  methods: {
    async getEmployeesInfo() {
      this.peoples = await getEmployeesInfo()
      for (let i = 1; i < this.peoples.length; i++) {
        this.peoples[i].username = '阿草' + i + '号'
      }
    },
    async  getDepartDetail(id) {
      this.formData = await getDepartDetail(id)
    },
    btnSure() {
      this.$refs.deptForm.validate(async isOk => {
        if (isOk) {
          if (this.formData.id) {
            // 如果有id则是编辑接口
            await updateDepartments(this.formData)
          } else {
            // 否则是新增接口
            await addDepartments({ ...this.formData, pid: this.treeNode.id })
          }
          this.$emit('addDepts')
          this.$emit('update:showDialog', false)
        }
      })
    },
    btnCancel() {
      // reset.Fields只能重置表单上的数据,非表单上的数据无法重置 会导致"点击过编辑部门之后再添加子部门时标题仍为编辑部门"的bug产生 所以手动重置表单
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduction: ''
      }
      this.$emit('update:showDialog', false)
      this.$refs.deptForm.resetFields()
    }
  }
}
</script>

<style>

</style>
