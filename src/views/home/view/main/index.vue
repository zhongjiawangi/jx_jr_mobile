<template>
  <div class="main">
    <div style="height: 40px">
      <div class="top">这里是标题</div>
    </div>
    <div class="tab">
      <div class="staus_box">
        <van-button icon="search" round @click="jumpSearch" />
        <van-tabs @click="changeStatus">
          <van-tab v-for="(item, index) in statusList" :key="index" :title="item.name"></van-tab>
        </van-tabs>
      </div>
      <div class="type_box">
        <van-tabs @click="changeType">
          <van-tab v-for="(item, index) in projectList" :key="index" :title="item.name"></van-tab>
        </van-tabs>
      </div>

      <div class="city_box">
        <CityPicker @changeCity="changeCity" />
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
    <div class="update" v-if="update">
      <van-loading size="24px" type="spinner" color="#1989fa">加载中...</van-loading>
    </div>
    <div class="contant" v-else>
      <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
        <van-empty image="search" description="空空如也" v-if="info.length === 0" />
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" v-else>
          <Acticle v-for="item in info" :key="item" />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import Acticle from '@/views/home/components/project.vue'
import CityPicker from '../../components/cityPicker.vue';
export default {
  name: 'mainPage',
  components: {
    Acticle,
    CityPicker
  },
  data() {
    return {
      count: 15,
      update: false,
      isLoading: false,
      loading: false,
      finished: false,
      index: 0,
      info: [],
      statusList: [
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
        city: '',
        status: 'all',
        type: '1'
      }
    }
  },
  methods: {
    changeCity(value) {
      this.searchData.city = value;
      this.update = true;
      setTimeout(() => {
        this.update = false
        this.getList()
      }, 1000)
    },
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
        this.getList(true)
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
        if (this.info.length >= 60) {
          this.finished = true;
        }
      }, 1000);
    },
    changeStatus(name, title) {
      const result = this.statusList.find((item) => item.name === title)
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
    getList(isDropDown = false) {
      const data = Object.assign(this.searchData)
      if (isDropDown) {
        this.info = []
        for (let i = 0; i < 15; i++) {
          this.index++
          this.info.unshift(this.index)
        }
      } else {
        for (let i = 0; i < 15; i++) {
          this.index++
          this.info.push(this.index)
        }
      }
      this.update = false
      console.log(data);
    }
  },
  created() {
    // console.log(this.$route);
    for (let i = 0; i < 15; i++) {
      this.index++
      this.info.push(this.index)
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  .top {
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background-color: pink;
    position: fixed;
    z-index: 10;
  }

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

  .city_b1ox {
    border-bottom: 1px solid #000;
    border-top: 1px solid #000;
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