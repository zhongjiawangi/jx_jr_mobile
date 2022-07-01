<template>
  <div class="main">
      <div class="tab">
        <div class="staus_box">
          <van-button icon="search" round @click="jumpSearch"/>
          <van-tabs @click="changeStatus">
            <van-tab v-for="(item, index) in searchList" :key="index" :title="item.name"></van-tab>
          </van-tabs>
        </div>
        <div class="type_box">
          <van-tabs @click="changeType">
            <van-tab v-for="(item, index) in projectList" :key="index" :title="item.name"></van-tab>
          </van-tabs>
        </div>
        <div class="notic">
          <van-notice-bar left-icon="volume-o" :scrollable="false" background="#fff" color="#000" @click="click">
            <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
              <van-swipe-item>内容 1</van-swipe-item>
              <van-swipe-item>内容 2</van-swipe-item>
              <van-swipe-item>内容 3</van-swipe-item>
            </van-swipe>
          </van-notice-bar>
        </div>
      </div>
      <!-- <div v-for="item in 100" :key="item">
      <Acticle/>
    </div> -->
      <div class="update" v-if="update">
        <van-loading size="24px" type="spinner" color="#1989fa">加载中...</van-loading>
      </div>
      <div class="contant" v-else>
        <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh" style="min-height: 100vh;">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <Acticle v-for="item in count" :key="item" />
          </van-list>
        </van-pull-refresh>
      </div>
  </div>
</template>

<script>
import Acticle from '@/views/home/components/project.vue'
export default {
  name: 'mainPage',
  components: {
    Acticle
  },
  data() {
    return {
      count: 15,
      update: false,
      isLoading: false,
      loading: false,
      finished: false,
      searchList: [
        {
          name: '全部',
          value: 'all'
        },
        {
          name: '公告中',
          value: 'announcement'
        },
        {
          name: '待开标',
          value: 'pending'
        },
        {
          name: '已中标',
          value: 'winBidder'
        },
        {
          name: '未中标',
          value: 'unBidder'
        },
        {
          name: '延期',
          value: 'postponed'
        },
        {
          name: '流标',
          value: 'streamLabels'
        },
      ],
      projectList: [
        {
          name: '所有',
          value: '0'
        },
        {
          name: '房建市政',
          value: '1'
        },
        {
          name: '水利工程',
          value: '2'
        },
        {
          name: '交通工程',
          value: '3'
        },
        {
          name: '政府采购',
          value: '4'
        },
        {
          name: '其他类型',
          value: '5'
        },
      ],
      searchData: {
        status: 'all',
        type: '1'
      }
    }
  },
  methods: {
    jumpSearch() {
      this.$router.push({ path: '/home/search' })
    },
    click(Event) {
      console.log(Event.target.innerHTML);
    },
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
        this.count++
      }, 1000);
    },
    // 加载更多
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.refreshing = false;
        }
        this.getList()
        this.loading = false;

        if (this.count >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    changeStatus(name, title) {
      const result = this.searchList.find((item) => item.name === title)
      this.searchData.status = result.value
      this.update = true
      setTimeout(() => {
        this.getList()
      }, 1000)
    },
    changeType(name, title) {
      const result = this.projectList.find((item) => item.name === title)
      this.searchData.type = result.value
      this.update = true
      setTimeout(() => {
        this.getList()
      }, 1000)
    },
    getList() {
      const data = Object.assign(this.searchData)
      this.count += 10
      this.update = false
      console.log(data);
    }
  },
  created() {
    // console.log(this.$route);
  }
}
</script>

<style lang="less" scoped>
.main {
  .staus_box {
    display: flex;
    justify-content: center;
    align-items: center;

    /deep/.van-button {
      width: 35px;
      height: 35px;
      margin-left: 5px;
    }
  }

  .update {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
  }

  .notice-swipe {
    height: 40px;
    line-height: 40px;
  }
}
</style>