<template>
    <div class="record">
        <van-nav-bar :title="`${$route.query.name}申请记录`" left-text="返回" left-arrow @click-left="goBack">
        </van-nav-bar>
        <van-empty description="空空如也" class="empty" />
    </div>
</template>

<script>
export default {
    name: 'applicationRecord',
    data() {
        return {

        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
    },
    created() {
        // console.log(this.$route.query.name);
    }
}
</script>

<style lang="less" scoped>
.record {
    .empty {
        margin-top: 50%;
    }
}
</style>