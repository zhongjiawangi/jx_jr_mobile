<template>
  <div class="introduce">
    <div class="box" v-for="(item, key) in infoList" :key="key">
      <p>{{ key == 'notice' ? '招标公告' : key == 'openInfo' ? '开标信息' : key == 'candidate' ? '中标候选人公示' : '中标结果公示' }}</p>
      <van-cell v-for="(i, k) in item" :key="k" :title="i" :value="getItem(key, k)" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'projectIntroduce',
  props: {
    info: {
      default: {}
    }
  },
  computed: {
    getItem() {
      return function (key1, key2) {
        return this.info[key1] && this.info[key1][key2] || '--'
      }
    }
  },
  data() {
    return {
      infoList: {
        notice: {
          unitName: '招标单位名称',
          investment: '项目投资',
          reviewMethod: '审查方式',
          aptitude: '企业资质类型',
          builderLevel: '建造师等级',
          fundNeed: '资金落实',
          bidNum: '标段数量',
          agent: '招标代理',
          telephone: '联系电话',
          controlPrice: '控制价或邀约价(元)',
          earnestMoney: '保证金(万元)',
          duration: '工期(天)',
          downloadDeadline: '下载截至时间',
          otherRequirements: '其他要求'
        },
        openInfo: {
          openTime: '开标时间',
          openAddress: '开标地点'
        },
        candidate: {
          list: '中标候选人'
        },
        bidResult: {
          bidWinnerName: '中标单位名称'
        }
      },
    }
  }
}
</script>

<style lang="less" scoped>
.introduce {
  .box {
    p {
      padding: 10px 16px;
      background-color: rgb(247, 248, 250);
    }
  }
}
</style>