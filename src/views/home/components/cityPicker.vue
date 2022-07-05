<template>
  <div class="cityPicker">
    <!-- <van-field readonly clickable :value="value" label="地区:" placeholder="选择城市" @click="showPicker = true" />
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
    </van-popup> -->
    <van-dropdown-menu active-color="#1989fa" >
      <van-dropdown-item v-model="value" :options="columns" @change="changeCity" />
    </van-dropdown-menu>
  </div>
</template>

<script>
export default {
  name: "cityPicker",
  data() {
    return {
      value: 0,
      showPicker: false,
      columns: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 },
      ],
    };
  },
  methods: {
    changeCity(value) {
      this.value = value;
      this.showPicker = false
      this.$emit('changeCity', this.value)
    },
  },
}
</script>

<style lang="less" scoped>
</style>