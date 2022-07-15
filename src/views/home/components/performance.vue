<template>
    <div class="performance">
        <van-form @submit="onSubmit">
            <van-field v-model="form.projectName" name="projectName" label="项目名称" placeholder="请输入项目名称"
                :rules="[{ required: true }]" />
            <van-field v-model="form.earnestMoney" type="number" name="earnestMoney" label="保证金金额(元)"
                placeholder="请输入保证金金额" :rules="[{ required: true }]" />
            <van-field v-model="address" is-link readonly label="项目地区" placeholder="请选择项目地区" @click="show = true"
                :rules="[{ required: true, message: '' }]" />
            <van-popup v-model="show" round position="bottom">
                <van-cascader v-model="form.projectAddress" title="请选择所在地区" :options="cityList"
                    :field-names="fieldNames" @close="show = false" @finish="onFinish" />
            </van-popup>
            <van-field v-model="type" is-link readonly label="项目类型" placeholder="请选择项目类型" @click="show1 = true"
                :rules="[{ required: true }]" />
            <van-popup v-model="show1" round position="bottom">
                <van-picker show-toolbar :columns="columns" @cancel="show1 = false" @confirm="onConfirm" />
            </van-popup>
            <van-field v-model="form.durationTime" type="number" name="durationTime" label="项目周期(天)"
                placeholder="请输入项目周期" :rules="[{ required: true }]" />
            <van-field v-model="form.tenderCompanyName" name="tenderCompanyName" label="投标公司名称" placeholder="请输入投标公司名称"
                :rules="[{ required: true }]" />
            <van-field v-model="form.telephone" type="number" name="telephone" label="联系电话" placeholder="请输入联系电话"
                :rules="[{ pattern }]" />
            <van-field name="uploader" label="标书文件" :rules="[{ required: true, message: '请上传标书文件' }]">
                <template #input>
                    <van-uploader v-model="form.uploader" :max-count="1" accept=".doc,.docx,.pdf"
                        :before-read="beforeRead">
                        <van-button icon="plus"></van-button>
                    </van-uploader>
                </template>
            </van-field>
            <div style="margin: 30px;">
                <van-button round block type="info" native-type="submit">立即申请</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import cityJson from '@/utils/jsCity.js'
export default {
    name: "performanceSecurity",
    data() {
        return {
            show: false,
            show1: false,
            cityList: cityJson,
            address: '',
            type: '',
            fieldNames: {
                text: 'label',
                value: 'value',
                children: 'children',
            },
            form: {
                projectName: '',
                earnestMoney: null,
                projectAddress: '',
                projectType: '',
                durationTime: '',
                telephone: '',
                tenderCompanyName: '',
                projectFile: '',
                uploader: [],
            },
            projectTypeDic: [
                {
                    text: '请选择项目类型',
                    value: 0
                },
                {
                    text: '房建市政',
                    value: 1
                },
                {
                    text: '水利工程',
                    value: 2
                },
                {
                    text: '交通工程',
                    value: 3
                },
                {
                    text: '政府采购',
                    value: 4
                },
                {
                    text: '其他类型',
                    value: 5
                },
            ],
            columns: ['房建市政', '水利工程', '交通工程', '政府采购', '其他类型'],
            pattern: /\d{6-11}/
        }
    },
    methods: {
        onSubmit() {
            console.log('submit', this.form);
        },
        onFinish({ selectedOptions }) {
            this.show = false;
            this.address = selectedOptions.map((option) => option.label).join('/');
        },
        onConfirm(value) {
            this.show1 = false;
            this.type = value
            this.form.projectType = this.projectTypeDic.find((item) => item.text = value).value;
        },
        validator(val) {
            if (val == 0) return false
            return true
        },
        beforeRead(file) {
            if (/(.doc|.docx|.pdf)$/.test(file.name)) {
                return true
            }
            return false;
        }
    },
}
</script>

<style lang="less" scoped>
.performance {
    /deep/.van-field__label::before {
        content: "*";
        color: red;
        position: absolute;
        left: 5px;
    }

    /deep/.van-dropdown-menu__bar {
        box-shadow: none;
    }

    /deep/.van-field__label {
        display: flex;
        align-items: center;
    }
}
</style>