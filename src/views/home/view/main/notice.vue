<template>
    <div class="notice">
        <van-nav-bar title="公告列表" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="container">
            <h3>{{ notice.title }}</h3>
            <van-cell title="时间" :value="notice.time" />
            <van-cell title="内容" :label="notice.contant" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'noticePage',
    data() {
        return {
            notice: {},
            id: ''
        }
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
    },
    created() {
        /**
         * 请求数据
         */
        this.notice = {
            id: 1,
            title: '这里是公告标题',
            time: '2022.12.12.12',
            contant: '这里是公告内容这里是公告内容这里是公告内容这里是公告内容这里是公告内容这里是公告内容这里是公告内容'

        }
    }
}
</script>

<style lang="less" scoped>
.notice {
    .container {
        h3 {
            text-align: center;
            margin: 10px 0;
        }
    }
}
</style>