<template>
  <div class="farmersWork">
    <van-form @submit="onSubmit">
      <van-field v-model="projectName" name="" label="项目名称" placeholder="请输入项目名称" :rules="[{ required: true }]" />
      <van-field v-model="earnestMoney" name="" label="保证金金额(元)" placeholder="请输入保证金金额" :rules="[{ required: true }]" />
      <van-field v-model="durationTime" name="" label="项目周期(天)" placeholder="请输入项目周期" :rules="[{ required: true }]" />
      <van-field v-model="tenderCompanyName" name="" label="投标公司名称" placeholder="请输入投标公司名称"
        :rules="[{ required: true }]" />
      <van-field v-model="telephone" name="" label="联系电话" placeholder="请输入联系电话" :rules="[{ required: true }]" />
      <van-field name="uploader" label="农民工缴费通知书" :rules="[{ required: true, message: '请上传通知书' }]">
        <template #input>
          <van-uploader v-model="uploader" :max-count="1" accept=".doc,.docx,.pdf" :before-read="beforeRead">
            <van-button icon="plus"></van-button>
          </van-uploader>
        </template>
      </van-field>
      <div style="margin: 30px;">
        <van-button round block type="info" native-type="submit">立即申请</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: "farmersWork",
  data() {
    return {
      projectName: '',
      earnestMoney: '',
      durationTime: '',
      telephone: '',
      tenderCompanyName: '',
      projectFile: '',
      uploader: []
    };
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values);
    },
    beforeRead(file) {
      if (/(.doc|.docx|.pdf)$/.test(file.name)) {
        return true
      }
      return false;
    }
  },
}
</script>

<style lang="less" scoped>
.farmersWork {

  /deep/.van-field__label::before {
    content: "*";
    color: red;
    position: absolute;
    left: 5px;
  }
}
</style>