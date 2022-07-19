<template>
  <div class="detail">
    <van-nav-bar title="项目详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="info_box">
      <p>{{ info.projectName || '项目名称' }}</p>
      <div class="simpleInfo">
        <div class="left">
          <div class="img">
            <img src="@/assets/logo.png" alt="">
          </div>
          <div class="contant">
            <div>
              <span>{{ info.type.name || '项目类型' }}</span><span>【{{ info.area || '地区' }}】</span>
            </div>
            <div>公示时间：{{ info.time || '2022.12.12 00:00:00' }}</div>
          </div>
        </div>
        <div :class="like ? 'like operation' : 'operation'" @click="changeLike">
          <van-icon :name="like ? 'star' : 'star-o'" />
          <span>收藏</span>
          <!-- <van-switch v-model="checked" @change="changeLike" size="24px"/> -->
        </div>
      </div>
    </div>
    <div class="tab">
      <van-tabs v-model="active" animated>
        <van-tab v-for="(item, index) in tabList" :title="item.title" :key="index">
          <component :is="item.name" :info="info" />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { getProjectInfo, } from '@/api/index.js'
import Introduce from '@/views/home/components/introduce.vue'
import Announcement from '@/views/home/components/announcement.vue'
import Publicity from '@/views/home/components/publicity.vue'
import Bids from '@/views/home/components/bids.vue'
export default {
  name: 'detailPage',
  components: { Introduce, Announcement, Bids, Publicity },
  data() {
    return {
      info: {
        type: {}
      },
      active: '0',
      like: false,
      tabList: [
        {
          title: '项目介绍',
          name: Introduce,
        },
        {
          title: '公告详情',
          name: Announcement,
        },
        {
          title: '开标详情',
          name: Bids,
        },
        {
          title: '公示详情',
          name: Publicity,
        }
      ]
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    changeLike() {
      this.like = !this.like;
      if (this.like) {
        /**
         * 绑定账号
         */
        return this.$toast.success({
          message: '已收藏',
          duration: 500
        })
      }
      /**
       * 解绑
       */
      this.$toast.fail({
        message: '取消收藏',
        duration: 500
      })
    },
    getProjectInfo(id) {
      getProjectInfo({ id: id }).then((res) => {
        this.info = res[0]
      })
    }
  },
  created() {
    window.scroll(0, 0);
    const id = this.$route.query.id
    this.getProjectInfo(id)
  }
}
</script>

<style lang="less" scoped>
.detail {
  .info_box {
    padding: 10px 15px 0;
    background-color: #fff;
    border-bottom: 1px solid #dedede;

  }

  .simpleInfo {
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      align-items: center;

      img {
        width: 50px;
        border-radius: 50%;
      }

      .contant {
        margin-left: 20px;
        font-size: 12px;
        color: #999;

        span {
          font-size: 14px;
          color: #333;
          margin-right: 20px;
        }

        div {
          margin: 5px 0;
        }
      }
    }

    .operation {
      text-align: center;
    }

    .like {
      color: rgb(25, 152, 251)
    }
  }
}
</style>