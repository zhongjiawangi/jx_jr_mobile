<template>
  <div class="layout">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
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
      active: '',
    };
  },
  // watch: {
  //   $route(to) {
  //     if (/^\/user/.test(to.path)) {
  //       this.active = 'user'
  //     }
  //     if (/^\/query/.test(to.path)) {
  //       this.active = 'query'
  //     }
  //     if (/^\/home/.test(to.path)) {
  //       this.active = 'home'
  //     }
  //   }
  // },
  mounted() {
    if (/^\/user/.test(this.$route.path)) {
      this.active = 'user'
    }
    if (/^\/query/.test(this.$route.path)) {
      this.active = 'query'
    }
    if (/^\/home/.test(this.$route.path)) {
      this.active = 'home'
    }
  }
}
</script>

<style lang="less" scoped>
</style>