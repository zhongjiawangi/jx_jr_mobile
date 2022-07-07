<template>
  <div class="login">
    <div class="top">
      <div class="logo">
        <img src="@/assets/log.png" alt="">
      </div>
      <p>用户登录</p>
    </div>
    <div class="form">
      <van-form @submit="onSubmit">
        <van-field v-model="username" name="用户名" label="用户名" placeholder="请输入用户名" :rules="[{ required: true }]" />
        <van-field v-model="password" type="password" name="密码" label="密码" placeholder="请输入密码"
          :rules="[{ required: true }]" />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loginPage',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    onSubmit() {
      const info = { username: this.username}
      localStorage.setItem('token', 'wqeqeqw')
      localStorage.setItem('userinfo', JSON.stringify(info))
      this.$router.go(-1)
      this.$toast.success({
        message: '登陆成功',
        duration: 1000
      })
    },
  },
}
</script>

<style lang="less" scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;

  .top {
    width: 100%;
    margin-bottom: 50px;

    .logo {
      width: 100%;
      margin-left: 10%;
      margin-bottom: 50px;
      img {
        height: 50px;
      }
    }

    p {
      font-size: 30px;
      color: #333;
      text-align: center;
    }
  }
}
</style>