<template>
  <div class="noticeList">
    <van-nav-bar title="公告列表" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="list">
      <div class="item" v-for="(item, index) in noticeList" :key="index" @click="jump(item.id)">
        <van-icon name="volume" class="icon" />
        <div class="right">
          <div>{{ item.title }}</div>
          <div><span>时间：{{ item.time }}</span></div>
          <div class="contant van-ellipsis">{{ item.contant }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNoticeList } from '@/api/index.js'

export default {
  name: "noticeList",
  data() {
    return {
      notice: {},
      noticeList: []
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    jump(id) {
      console.log(id);
      this.$router.push({
        path: '/home/notice',
        query: {
          id: id
        }
      })
    }
  },
  created() {
    /**
     * 请求数据
     */
    getNoticeList().then((res) => {
      this.noticeList = res
    })
  },
}
</script>

<style lang="less" scoped>
.noticeList {
  .container {
    h3 {
      text-align: center;
      margin: 10px 0;
    }
  }

  .list {
    .item {
      display: flex;
      align-items: center;
      padding: 20px 0;
      border-bottom: 1px solid #dedede;

      .right {
        width: 85%;

        div {
          margin: 5px;
        }

        span {
          font-size: 14px;
          color: #999;
        }

        .contant {
          font-size: 14px;
          color: #666;
        }
      }

      .icon {
        flex: 1;
        text-align: center;
        font-size: 36px;
        color: rgb(67, 160, 251)
      }
    }
  }
}
</style>