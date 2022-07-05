<template>
    <div class="info">
        <van-nav-bar title="保函详情" left-text="返回" left-arrow @click-left="onClickLeft" />
        <!-- <div class="order_info">
            <h3>项目信息</h3>
            <div class="item" v-for="(item, key) in orderInfo" :key="key">
                <span>{{ item }}</span>: {{ key }}
            </div>
        </div> -->
        <van-tabs v-model="active" animated swipeable>
            <van-tab v-for="(item, index) in menu" :title="item.name" :key="index">
                <!-- <div class="box">
                    <div class="item" v-for="(i, key) in item.info" :key="key">
                        <span>{{ i }}</span>:<span>{{ info[item.value][key] || '--' }}</span>
                    </div>
                </div> -->
                <van-cell-group inset>
                    <van-cell :title="i" :value="info[item.value][key] || '--'" v-for="(i, key) in item.info"
                        :key="key" />
                </van-cell-group>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
export default {
    name: 'infoPage',
    data() {
        return {
            info: {},
            menu: [
                {
                    name: '订单信息',
                    value: 'order',
                    info: {
                        elogApplyNo: "申请编号",
                        serviceNo: "订单编号",
                        createTime: "申请时间",
                        insureTime: '开函时间'
                    }
                },
                {
                    name: '项目信息',
                    value: 'project',
                    info: {
                        projectName: "项目名称",
                        projectNo: "项目编号",
                        // projectTradeType: "交易方式",
                        projectType: "交易项目类型",
                        projectCategory: "交易项目类别",
                        // projectArea: "项目所在地",
                        tenderDeposit: "担保金额(元)",
                        insureDay: "保函期限",
                        insuredName: "招标人",
                        insuredCreditCode: "招标人信用代码",
                        insuredAddress: "招标人地址",
                    }
                },
                {
                    name: '客户信息',
                    value: 'insure',
                    info: {
                        insureName: "客户名称",
                        insureCreditCode: "统一社会信用代码",
                        insureAddress: "客户地址",
                        insureLegalName: "法人",
                        insureLegalIdCard: "法人证件号码",
                        insureBankNo: "银行账户",
                        insureBankName: "开户银行",
                    }
                },
            ],
        }
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
    },
    created() {
        this.info = JSON.parse(sessionStorage.getItem('projectInfo'))
    }
}
</script>

<style lang="less" scoped>
</style>