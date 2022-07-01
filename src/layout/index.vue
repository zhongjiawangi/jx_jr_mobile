<template>
  <div class="layout">
    <div style="height: 50px">
      <div class="top">这里是标题</div>
    </div>
    <keep-alive id="homePage">
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
    if (this.$route.name === '用户') {
      this.active = 'user'
    }
  }
}
</script>

<style lang="less" scoped>
.layout {
  .top {
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    background-color: pink;
    position: fixed;
    z-index: 10;
  }
}
</style>