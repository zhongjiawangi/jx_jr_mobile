<template>
  <div class="search">
    <div style="height: 40px">
      <div class="top">
        <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="onClickLeft" />
      </div>
    </div>
    <div class="search_box">
      <form action="/">
        <van-search v-model="searchData.keyword" show-action placeholder="请输入搜索关键词" @search="onSearch"
          @cancel="onCancel" @focus="onFocus" @blur="onBlur" />
        <div class="history" v-if="showHistory">
          <div class="top_bar">
            <span>历史记录</span>
          </div>
          <ul>
            <li v-for="(item, index) in historyList" :key="index" class="item">
              <p @click="chooseHistory(item)" class="van-ellipsis">{{ item }}</p>
              <img src="@/assets/img/home/delete.png" @click.stop="delHistory(item)" class="del_btn" alt="">
            </li>
          </ul>
          <div v-if="historyList.length" @click="historyList = []">全部删除</div>
        </div>
        <div class="option_box">
          <div class="city_option">
            <CityPicker @changeCity="changeCity" />
          </div>
          <div class="status_option">
            <van-dropdown-menu>
              <van-dropdown-item v-model="searchData.status" :options="statusList" @change="changeStatus" />
            </van-dropdown-menu>
          </div>
        </div>
        <div class="type_box">
          <van-tabs @click="changeType">
            <van-tab v-for="(item, index) in projectList" :key="index" :title="item.name"></van-tab>
          </van-tabs>
        </div>
      </form>
    </div>
    <van-divider />
    <div class="update" v-if="update">
      <van-loading size="24px" type="spinner" color="#1989fa">加载中...</van-loading>
    </div>
    <div class="result_box" v-else>
      <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
        <van-empty image="search" description="空空如也" v-if="info.length === 0" />
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" v-else>
          <Project v-for="item in info" :key="item" />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import CityPicker from '../../components/cityPicker.vue';
import Project from '../../components/project.vue';
export default {
  name: "searchPage",
  data() {
    return {
      update: false,
      isLoading: false,
      loading: false,
      finished: false,
      index: 0,
      showHistory: false,
      info: [],
      historyList: ['1111111111111111111111111111111111111111111111111111', 2, 3, 4, 5],
      searchData: {
        keyword: '',
        status: 'all',
        city: '',
        type: ''
      },
      statusList: [
        {
          text: '全部',
          value: 'all'
        },
        {
          text: '公告中',
          value: 'announcement'
        },
        {
          text: '待开标',
          value: 'pending'
        },
        {
          text: '已中标',
          value: 'winBidder'
        },
        {
          text: '未中标',
          value: 'unBidder'
        },
        {
          text: '延期',
          value: 'postponed'
        },
        {
          text: '流标',
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
    };
  },
  methods: {
    onFocus() {
      this.showHistory = true
    },
    onBlur() {
      // this.showHistory = false
    },
    delHistory(item) {
      this.historyList = this.historyList.filter((i) => i != item)
    },
    chooseHistory(item) {
      this.searchData.keyword = item
      this.update = true;
      setTimeout(() => {
        this.getList()
        this.update = false;
      }, 1000)
    },
    onSearch() {
      this.showHistory = false
      this.update = true;
      setTimeout(() => {
        this.getList()
        this.update = false;
      }, 1000)
    },
    onCancel() {
      this.keyword = "";
    },
    changeCity(val) {
      this.searchData.city = val;
      this.update = true;
      setTimeout(() => {
        this.getList()
        this.update = false;
      }, 1000)
    },
    changeStatus() {
      this.update = true;
      setTimeout(() => {
        this.getList()
        this.update = false;
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
    onClickLeft() {
      this.$router.go(-1);
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
    for (let i = 0; i < 15; i++) {
      this.index++
      this.info.push(this.index)
    }
  },
  components: { CityPicker, Project }
}
</script>

<style lang="less" scoped>
.search {
  .top {
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background-color: pink;
    position: fixed;
    z-index: 10;
  }

  .search_box {
    .history {
      padding-left: 20px;

      .top_bar {
        margin: 10px 0;
      }

      ul {
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-around;
        align-items: center;

        .item {
          // border: 1px solid #000;
          width: 43%;
          height: 20px;
          margin-right: 20px;
          margin-bottom: 5px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: rgb(245, 245, 245);

          p {
            width: 80%;
          }

          .del_btn {
            border-radius: 50%;
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }

  .option_box {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .city_option {
      /deep/.van-field__control {
        text-align: center;
      }
    }

    .status_option {

      width: 100px;

      /deep/.van-dropdown-menu__bar {
        box-shadow: none;
      }
    }
  }

  /deep/.van-divider {
    margin-top: 0;
  }

  .update {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
  }
}
</style>