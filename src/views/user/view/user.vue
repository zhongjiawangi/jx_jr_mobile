<template>
    <div class="user">
        <van-nav-bar title="个人中心" />
        <div class="logoInfo">
            <van-cell is-link center @click="showInfo = true">
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                    <div class="info">
                        <van-image round width="4rem" height="4rem" src="https://img01.yzcdn.cn/vant/cat.jpeg"
                            fit="cover" />
                        <span class="custom-title">登录/注册</span>
                    </div>
                </template>
            </van-cell>
            <van-popup v-model="showInfo" position="left" closeable :style="{ width: '100%', height: '100%' }">
                <div class="info_box">
                    <van-cell v-for="(item, key) in infoList" :key="key" :title="item" is-link :value="userInfo[key]"
                        @click="upDate(key)" />
                </div>
            </van-popup>
            <van-popup :value="keyword === 'nickname'" round position="bottom">
                <van-picker show-toolbar :columns="columns" @cancel="update = false" @confirm="onConfirm" />
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
            update: false,
            columns: ['男', '女'],
            userInfo: {
                photo: '我的头像',
                nickname: '昵称',
                name: '姓名',
                sex: '性别',
                job: '职务',
                address: '地址',
                telephone: '手机',
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
        login() {
            console.log(1);
        },
        upDate(key) {
            this.update = true;
            this.keyword = key;
        },
        onConfirm(value) {
            console.log(value);
            this.keyword = ''
        }
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