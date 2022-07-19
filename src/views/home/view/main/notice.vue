<template>
    <div class="notice">
        <van-nav-bar title="公告详情" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="container">
            <h3>{{ notice.title }}</h3>
            <van-cell title="时间" :value="notice.time || ''" />
            <van-cell title="内容" :label="notice.contant || ''" />
        </div>
    </div>
</template>

<script>
import { getNoticeInfo } from '@/api/index.js'
export default {
    name: 'noticePage',
    data() {
        return {
            notice: {},
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
        if (this.$route.query.id) {
            const id = this.$route.query.id
            getNoticeInfo({ id: id }).then((res) => {
                this.notice = res
            })
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