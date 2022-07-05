<template>
    <div class="about">
        <van-nav-bar left-text="返回" left-arrow title="关于我们" @click-left="onClickLeft" />
    </div>
</template>

<script>
export default {
    name: 'aboutPage',
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="less" scoped>
</style>