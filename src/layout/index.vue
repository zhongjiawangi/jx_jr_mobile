<template>
    <div class="layout">
        <keep-alive id="homePage">
            <router-view/>
        </keep-alive>
        <div class="tabbar">
            <van-tabbar route :placeholder="true">
                <van-tabbar-item to="/" icon="home-o">主页</van-tabbar-item>
                <van-tabbar-item to="/user" icon="setting-o">我的</van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>

<script>
export default {
    name: "layOut",
}
</script>

<style lang="less" scoped>
</style>