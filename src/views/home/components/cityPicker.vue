<template>
  <div class="cityPicker">
    <!-- <van-field readonly clickable :value="value" label="地区:" placeholder="选择城市" @click="showPicker = true" />
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
    </van-popup> -->
    <!-- <van-dropdown-menu active-color="#1989fa" >
      <van-dropdown-item v-model="value" :options="columns" @change="changeCity" />
    </van-dropdown-menu> -->
    <!-- <van-cascader v-model="city" title="请选择所在地区" :options="cityList" :field-names="fieldNames" /> -->
    <van-field v-model="fieldValue" is-link readonly label="地区" placeholder="请选择所在地区" @click="show = true" />
    <van-popup v-model="show" round position="bottom">
      <van-cascader v-model="city" title="请选择所在地区" :options="cityList" :field-names="fieldNames" @close="show = false"
        @finish="onFinish" />
    </van-popup>
  </div>
</template>

<script>
import cityJson from '@/utils/jsCity.js'
export default {
  name: "cityPicker",
  data() {
    return {
      value: 0,
      showPicker: false,
      show: false,
      fieldValue: '江西省',
      columns: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 },
      ],
      city: 360000,
      fieldNames: {
        text: 'label',
        value: 'value',
        children: 'children',
      },

      cityList: cityJson
    };
  },
  methods: {
    changeCity(value) {
      this.value = value;
      this.showPicker = false
      this.$emit('changeCity', this.value)
    },
    onFinish({ selectedOptions }) {
      this.show = false;
      this.$emit('changeCity', this.city)
      this.fieldValue = selectedOptions.map((option) => option.label).join('/');
    },
  },
  created() {
    this.$emit('changeCity', this.city)
  }
}
</script>

<style lang="less" scoped>
</style>