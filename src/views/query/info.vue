<template>
    <div class="info">
        <van-nav-bar title="保函详情" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-tabs v-model="active" animated swipeable>
            <van-tab v-for="(item, index) in menu" :title="item.name" :key="index">
                <van-cell-group inset>
                    <div v-for="(i, key) in item.info" :key="key">
                        <van-cell :title="i"
                            :value="findName(typeListDic, info[item.value[0]][key] || info[item.value[1]][key] || info[item.value[2]][key])"
                            v-if="key === 'projectType'" />
                        <van-cell :title="i"
                            :value="findName(categoryListDic, info[item.value[0]][key] || info[item.value[1]][key] || info[item.value[2]][key])"
                            v-else-if="key === 'projectCategory'" />
                        <van-cell :title="i"
                            :value="info[item.value[0]][key] || info[item.value[1]][key] || info[item.value[2]][key] || '--'"
                            v-else />
                    </div>
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
            active: '',
            info: {},
            menu: [
                {
                    name: '订单信息',
                    value: ['order'],
                    info: {
                        elogApplyNo: "申请编号",
                        serviceNo: "订单编号",
                        createTime: "申请时间",
                        insureTime: '开函时间'
                    }
                },
                {
                    name: '项目信息',
                    value: ['project', 'projectSync', 'insured'],
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
                    value: ['insure', 'insured'],
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
            // 项目类型字典
            typeListDic: [
                { name: "政府采购", value: "A1" },
                { name: "建设工程项目招投标", value: "B1" },
                { name: "矿业权交易", value: "C1" },
            ],
            // 项目类别字典
            categoryListDic: [
                { name: "普通项目（非交通公路项目）", value: "A1" },
                { name: "交通公路工程项目", value: "B1" },
                { name: "交通公路升级项目", value: "B2" },
            ]
        }
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        findName(obj, value) {
            if (!value) return "--"
            return obj.find((item) => item.value === value) ? obj.find((item) => item.value === value).name : value
        }
    },
    created() {
        this.info = JSON.parse(sessionStorage.getItem('projectInfo')) || {}
    }
}
</script>

<style lang="less" scoped>
</style>