<template>
  <div class="main">
    <van-nav-bar title="这里是标题" />
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
      <div class="notice">
        <div class="box">
          <van-notice-bar left-icon="volume-o" :scrollable="false" color="#1989fa" background="#ecf9ff">
            <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
              <van-swipe-item v-for="(item, index) in noticeList" :key="index" @click="clickNotice(item)">{{ item.text
              }}
              </van-swipe-item>
            </van-swipe>
          </van-notice-bar>
        </div>
        <div class="more_notice" @click="moreNotice">更多公告</div>
      </div>
    </div>
    <div class="LOI_box">
      <div v-for="(item, index) in LOI" :key="index" class="item" @click="goLOI(item)">
        {{ item.name }}
      </div>
    </div>
    <div class="contant">
      <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
        <van-empty image="search" description="空空如也" v-if="info.length === 0" style="min-height: 60vh;" />
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
      page: 1,
      limit: 10,
      isLoading: false,
      isAlive: false,
      loading: false,
      finished: false,
      index: 0,
      info: [],
      noticeList: [
        {
          text: '这是第一条通知',
          id: 1
        },
        {
          text: '这是第二条通知',
          id: 2
        },
        {
          text: '这是第三条通知',
          id: 3
        },
      ],
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
      LOI: [
        {
          name: '履约保函',
          value: '',
          icon: '',
          type: 'performance'
        },
        {
          name: '农民工保函',
          value: '',
          icon: '',
          type: 'farmersWork'
        },
      ],
      searchData: {
        city: '',
        status: 'all',
        type: '1'
      },
      scrollTop: 0
    }
  },
  methods: {
    goLOI(item) {
      this.$router.push({
        path: '/home/loi',
        query: {
          name: item.name,
          type: item.type
        }
      })
    },
    moreNotice() {
      this.$router.push({ path: "/home/noticeList" })
    },
    clickNotice(item) {
      this.$router.push({
        path: '/home/notice',
        query: {
          id: item.id
        }
      })
    },
    changeCity(value) {
      this.searchData.city = value;
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 500
      });
      console.log(1);
      setTimeout(() => {
        this.page = 1
        this.getList()
      }, 500)
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
        this.page++
        this.getList(true)
      }, 500);
    },
    // 加载更多
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.refreshing = false;
        }
        this.page++
        this.getList()
        this.loading = false;
        if (this.info.length >= 60) {
          this.finished = true;
        }
      }, 500);
    },
    changeStatus(name, title) {
      const result = this.statusList.find((item) => item.name === title)
      this.searchData.status = result.value
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 500
      });
      setTimeout(() => {
        this.page = 1
        this.getList()
      }, 500)
    },
    changeType(name, title) {
      const result = this.projectList.find((item) => item.name === title)
      this.searchData.type = result.value
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 500
      });
      setTimeout(() => {
        this.page = 1
        this.getList()
      }, 500)
    },
    getList(isDropDown = false) {
      const obj = {
        page: this.page,
        limit: this.limit
      }
      const data = Object.assign(obj, this.searchData)
      // console.log(data);
      // 获取数据
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
      return data
    },
  },
  watch: {
    isAlive(newVal) {
      console.log(newVal);
    }
  },
  created() {
    if (!this.isAlive) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 500
      });
      this.getList()
    }
  },
  activated() {
    window.scroll(0, this.scrollTop)
  },
  beforeRouteLeave(to, from, next) {
    this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    this.isAlive = true
    next()
  },
}
</script>

<style lang="less" scoped>
.main {
  .top {
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background-color: rgb(25, 137, 250);
    position: fixed;
    z-index: 10;
  }

  .staus_box {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;

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

  .notice-swipe {
    height: 40px;
    line-height: 40px;
  }

  .notice {
    position: relative;

    .more_notice {
      position: absolute;
      padding-right: 30px;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      font-size: 14px;
    }

    .more_notice:after {
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      border-top: 1px solid #000;
      border-right: 1px solid #000;
      transform: rotate(45deg);
    }

    /deep/.van-notice-bar__content.van-ellipsis {
      width: 100%;
    }
  }

  .LOI_box {
    display: flex;
    margin: 20px 0;

    .item {
      flex: 1;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0px 2px 12px rgba(0, 0, 0, .1);
      border-radius: 5px;
      border: 1px solid #dedede;
      margin: 0 10px;
    }
  }
}
</style>