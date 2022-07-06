<template>
    <div class="user">
        <van-nav-bar title="个人中心" />
        <div class="logoInfo">
            <van-cell is-link center @click="onUser">
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                    <div class="info">
                        <van-image round width="60px" height="60px" src="https://img01.yzcdn.cn/vant/cat.jpeg"
                            fit="cover" />
                        <span class="custom-title" v-if="!isLogin">登录/注册</span>
                        <span class="custom-title" v-else>1111111</span>
                    </div>
                </template>
            </van-cell>
            <!-- 用户信息弹窗 -->
            <van-popup v-model="showInfo" position="left" closeable :style="{ width: '100%', height: '100%' }">
                <div class="info_box">
                    <van-cell v-for="(item, key) in infoList" :key="key" :title="item" is-link :value="userInfo[key]"
                        @click="upDate(key)" />
                </div>
            </van-popup>
            <!-- 修改用户信息弹窗 -->
            <van-popup v-model="showSexPop" round closeable position="bottom" :style="{ height: '50%' }">
                <div class="box">
                    <van-uploader :after-read="afterRead" v-if="keyword === 'photo'" />
                    <div v-else>
                        <van-picker v-if="keyword === 'sex'" show-toolbar :columns="columns"
                            @cancel="showSexPop = false" @confirm="onConfirm" />
                        <div v-else>
                            <van-field v-model="userInfo[keyword]" :label="infoList[keyword]"
                                :placeholder="`请填写${infoList[keyword]}`" :autofocus="true" @blur="onBlur">
                                <template #button>
                                    <van-button size="small" type="primary">确认</van-button>
                                </template>
                            </van-field>
                            <div></div>
                        </div>
                    </div>
                </div>
            </van-popup>
        </div>
        <div class="contant">
            <van-cell title="关于我们" is-link to="/user/about" />
            <van-cell title="联系我们" is-link @click="show = true" />
            <van-popup v-model="show" closeable round position="bottom" :style="{ height: '30%' }">
                <div class="contact">
                    <van-image round fit="cover" v-for="index in 4" :key="index" width="4rem" height="4rem"
                        src="https://img01.yzcdn.cn/vant/cat.jpeg" @click="showContant = true" />
                </div>
                <van-popup v-model="showContant">
                    <div class="ways">1</div>
                </van-popup>
            </van-popup>
        </div>
    </div>
</template>

<script>
export default {
    name: 'userPage',
    data() {
        return {
            keyword: '',
            show: false,
            showContant: false,
            showInfo: false,
            showSexPop: false,
            update: false,
            isLogin: localStorage.getItem('userinfo') && true,
            columns: ['男', '女'],
            userInfo: {
                photo: '我的头像',
                nickname: '',
                name: '',
                sex: '',
                job: '',
                address: '',
                telephone: '',
            },
            infoList:
            {
                photo: '我的头像',
                nickname: '昵称',
                name: '姓名',
                sex: '性别',
                job: '职务',
                address: '地址',
                telephone: '手机',
            },
        }
    },
    methods: {
        onBlur() {
            // 更新数据
        },
        afterRead(file) {
            // 此时可以自行将文件上传至服务器
            console.log(file);
        },
        onUser() {
            if (this.isLogin) {
                this.showInfo = true
            } else {
                this.$toast.fail({
                    duration: 500,
                    forbidClick: true,
                    message: '你还没登陆',
                });
            }
        },
        login() {
            console.log(1);
        },
        upDate(key) {
            this.update = true;
            // if (key === 'sex') {
            //     this.showSexPop = true
            // }
            this.keyword = key;
            this.showSexPop = true
        },
        onConfirm(val) {
            this.showSexPop = false
            this.userInfo.sex = val;
        }
    },
    created() {
        // console.log(window.devicePixelRatio);
    }
}
</script>

<style lang="less" scoped>
.user {
    .logoInfo {
        .info {
            display: flex;
            align-items: center;

            span {
                margin-left: 20px;
            }
        }

        .info_box {
            margin-top: 50px;
        }

        .box {
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .contant {
        margin-top: 10px;

        .van-cell {
            margin: 5px 0;
        }

        .contact {
            display: flex;
            height: 100%;
            align-items: center;
            justify-content: space-around;
        }

        .ways {
            width: 100px;
            height: 100px;
            text-align: center;
        }
    }
}
</style>