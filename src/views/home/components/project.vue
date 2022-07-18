<template>
  <div class="project" @click="goInfo(info.name)">
    <div class="top">
      <div class="left">
        <img src="@/assets/logo.png" alt="">
      </div>
      <div class="right">
        <div class="type">
          <span>{{ info.type.name }}</span>
          <b>{{ `【${info.area}】` }}</b>
          <i>{{ info.status.name }}</i>
        </div>
        <div class="time">
          <div>
            公示时间：
            <p>{{ info.publicationTime || '--' }}</p>
          </div>
          <div class="tender_time">
            开标时间：
            <p>{{ info.tenderTime }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="contant">
      <div>
        <h3>{{ info.projectName || '--' }}</h3>
      </div>
      <div>企业资质: {{ info.aptitude || '--' }}</div>
      <div>建造师等级: {{ info.builderLevel || '--' }}</div>
      <div>
        <span>审查方式: {{ info.censorType || '--' }}</span>
        <span>项目投资: {{ info.investment || '--' }}</span>
      </div>
      <div>招标单位: {{ info.biddingUnits || '--' }}</div>
    </div>
    <van-divider />
  </div>
</template>

<script>
export default {
  name: 'projectActicle',
  props: {
    info: {
      type: Object,
      default() {
        return {
          type: '房建市政',
          area: '地区',
          status: '状态',
          publicationTime: '2022-07-01 00:00:00',
          tenderTime: '2022-8-1 00:00:00',
          projectName: '',
          aptitude: '',
          builderLevel: '',
          censorType: '',
          investment: '',
          biddingUnits: ''
        }
      }
    }
  },
  methods: {
    goInfo(info) {
      this.$router.push({
        path: '/home/detail',
        query: {
          name: info
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.project {
  margin: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #dedede;
  border-radius: 5px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, .1);


  .top {
    display: flex;
    height: 60px;
    width: 100%;

    img {
      margin-right: 10px;
      height: 50px;
    }

    .right {
      flex: 1;
      font-size: 16px;

      .type {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 5px;
      }

      .time {
        display: flex;
        justify-content: space-between;
        font-size: 10px;
        color: #999;

        .tender_time {
          color: orange;
        }
      }
    }
  }

  .contant {
    color: #888;
    font-size: 15px;

    h3 {
      font-size: 18px;
      font-weight: 400;
      color: #333;
    }

    div {
      margin: 5px 0;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>