<template>
  <div class="dashboard-container">
    <div class="dashboard-text">用户名: {{ username }}</div>
    <page-tools :show-before="true">
      <span slot="before">哈哈哈</span>
      <el-button slot="after" type="primary">导入excel</el-button>
    </page-tools>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',

  computed: {
    ...mapGetters([
      'username'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
