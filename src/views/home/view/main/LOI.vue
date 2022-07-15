<template>
    <div class="LOI">
        <van-nav-bar :title="`${$route.query.name}申请`" left-text="返回" left-arrow @click-left="goBack"
            @click-right="goApplication">
            <template #right>
                <span class="record">申请记录</span>
            </template>
        </van-nav-bar>
        <div class="content">
            <p>担保公司：丰城市剑邑融资担保有限公司</p>
            <h3>填写信息</h3>
            <component :is='show' />
        </div>
    </div>
</template>

<script>
import FarmersWork from '@/views/home/components/farmersWork'
import Performance from '@/views/home/components/performance'

export default {
    name: "performanceSecurity",
    components: {
        FarmersWork,
        Performance
    },
    data() {
        return {
            show: ''
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        goApplication() {
            this.$router.push({
                path: "/home/application_record",
                query: this.$route.query
            })
        },
    },
    created() {
        if (this.$route.query.name === '履约保函') {
            this.show = 'Performance'
        }
        if (this.$route.query.name === '农民工保函') {
            this.show = 'FarmersWork'
        }
    }
}
</script>

<style lang="less" scoped>
.LOI {
    .record {
        // vertical-align: middle;
    }

    .record::after {
        content: '';
        display: inline-block;
        width: 9px;
        height: 9px;
        border-right: 1px solid #333;
        border-top: 1px solid #333;
        transform: rotate(45deg);
    }

    .content {
        padding: 10px;
        * {
            margin: 10px 0;
        }
        p {
            color: #666
        }
    }
}
</style>