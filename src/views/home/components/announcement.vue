<template>
  <div class="announcement">
    <!-- 公告详情 -->
    <div class="empty">
      <button @click="goFrom">来源</button>
      <van-empty image="search" description="空空如也" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'announcementPage',
  props: {
    info: {
      default: {}
    }
  },
  methods: {
    goFrom() {
      // window.location.href = this.url
    }
  }
}
</script>

<style lang="less" scoped>
.announcement {
  .empty {
    text-align: right;

    button {
      width: 60px;
      height: 30px;
      margin: 10px;
      line-height: 30px;
      text-align: center;
      border-radius: 5px;
      border: 1px solid rgb(25, 137, 250);
      background-color: #fff;
      color: rgb(25, 137, 250)
    }

    button:active {
      opacity: .5;
    }
  }
}
</style>