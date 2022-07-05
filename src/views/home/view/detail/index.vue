<template>
  <div class="detail">
    <div style="height: 50px">
      <div class="top">
        <van-nav-bar title="项目详情" left-text="返回" left-arrow @click-left="onClickLeft" />
      </div>
    </div>
    <div class="simpleInfo">
      项目简介
    </div>
    <div class="tab">
      <van-tabs v-model="active" animated>
        <van-tab v-for="(item, index) in tabList" :title="item.title" :key="index">
          <component :is="item.name" />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Introduce from '@/views/home/components/introduce.vue'
import Announcement from '@/views/home/components/announcement.vue'
import Publicity from '@/views/home/components/publicity.vue'
import Bids from '@/views/home/components/bids.vue'
export default {
  name: 'detailPage',
  components: { Introduce, Announcement, Bids, Publicity },
  data() {
    return {
      info: [],
      active: '0',
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
  },
  created() {
    console.log(this.$route);
  }
}
</script>

<style lang="less" scoped>
.detail {
  .top {
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background-color: rgb(25, 137, 250);
    position: fixed;
    z-index: 10;
  }
}
</style>