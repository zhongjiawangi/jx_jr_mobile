<template>
  <div class="layout">
    <keep-alive include="HomePage">
      <router-view />
    </keep-alive>

    <van-tabbar v-model="active" :placeholder="true" router>
      <van-tabbar-item replace to="/home" name="home" icon="wap-home">主页</van-tabbar-item>
      <van-tabbar-item replace to="/query" name="query" icon="search">保函查询</van-tabbar-item>
      <van-tabbar-item replace to="/user" name="user" icon="manager">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "layOut",
  data() {
    return {
      active: 'home',
    };
  },
  created() {
    if (this.$route.path.search('user')) {
      this.active = 'user'
    }
    if (this.$route.path.search('query')) {
      this.active = 'query'
    }
    if (this.$route.path.search('home')) {
      this.active = 'home'
    }
  }
}
</script>

<style lang="less" scoped>
</style>