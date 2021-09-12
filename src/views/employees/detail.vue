<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 登录账户设置 -->
          <el-tab-pane label="登录账户设置">
            <!-- 放置表单 -->
            <el-form label-width="120px" style="margin-left: 120px; margin-top:30px">
              <el-form-item label="姓名:">
                <el-input style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <!-- 个人详情 -->
          <el-tab-pane label="个人详情" />

          <!-- 岗位信息 -->
          <el-tab-pane label="岗位信息" />
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
