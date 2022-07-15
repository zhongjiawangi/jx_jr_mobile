<template>
  <div class="query">
    <van-nav-bar title="保函查询" />
    <div class="search_box">
      <van-tabs v-model="active" animated type="card" @change="change" color="rgb(25, 137, 250)">
        <van-tab v-for="(item, index) in platformList" :title="item" :key="index" :name="item">
          <div class="form">
            <van-form @submit="onSubmit">
              <van-field v-model="elogNo" label="保函编号" placeholder="请输入保函编号"
                :rules="[{ required: true, message: '' }]" />
              <div class="captcha">
                <van-field v-model="captcha" label="验证码" placeholder="请输入验证码"
                  :rules="[{ required: true, message: '' }]" />
                <img :src="img" @click="changeCap">
              </div>
              <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">查询</van-button>
              </div>
            </van-form>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'queryPage',
  data() {
    return {
      active: '',
      // FCJY2022063017450186185230
      elogNo: '',
      captcha: '',
      img: '',
      cap: '',
      jykb: {
        queryUrl: 'https://www.ee.jxjrtech.com/api/order_query/detail',
        imgUrl: 'https://www.ee.jxjrtech.com/api/captcha/get'
      },
      jjgd: {
        queryUrl: 'https://ee.jjgdgs.com.cn/api/order_query/detail',
        imgUrl: 'https://ee.jjgdgs.com.cn/api/captcha/get'
      },
      array: [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
      info: {
        order: {},
        project: {},
        insure: {}
      },
      platformList: ['剑邑快保', '九江工担'],
      timer: null
    };
  },
  methods: {
    onSubmit() {
      const data = {
        cap: this.cap,
        captcha: this.captcha,
        elogNo: this.elogNo
      }
      let url = this.jykb.queryUrl
      if (this.active === '九江工担') {
        url = this.jjgd.queryUrl
      }
      axios({
        methods: 'GET',
        url: url,
        params: data,
        headers: {
          "Content-Type": "application/json",
          "X-Guarantee": 1
        }
      })
        .then((res) => {
          this.changeCap();
          if (res.data.code === 1) {
            return this.$toast.fail(res.data.message)
          }
          const data = JSON.stringify(res.data.data)
          sessionStorage.setItem('projectInfo', data)
          this.$router.push({
            path: '/query/info'
          })
        })
    },
    change() {
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.changeCap()
      }, 500)
    },
    changeCap() {
      this.roundpass();
      this.getCaptcha();
    },
    getCaptcha() {
      let url = this.jykb.imgUrl
      if (this.active === '九江工担') {
        url = this.jjgd.imgUrl
      }
      axios
        .get(url, {
          responseType: "arraybuffer",
          params: { cap: this.cap },
        })
        .then(
          (response) => `data:image/png;base64,${btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          )}`
        )
        .then((data) => {
          this.img = data; // 赋值给img标签的src属性
        })
        .catch((res) => {
          this.$toast.fail(res.message);
          this.img = ''
        })
    },
    roundpass() {
      this.cap = this.roundPass().substr(0, 5);
    },
    roundPass() {
      let str = ""
      for (let i = 0; i < 8; i++) {
        str
          += this.array[Math.round(Math.random() * (this.array.length - 1))];
      }
      return str
    }
  },
  created() {
    this.changeCap();
  }
}
</script>

<style lang="less" scoped>
.query {

  .search_box {
    /deep/.van-tabs__nav--card {
      margin: 0;
    }

    .captcha {
      display: flex;
      align-items: center;

      img {
        width: 30%;
      }
    }

    .form {
      margin-top: 20px;
    }
  }
}
</style>