<!--
 * @Descripttion: 积分充值
 * @Author: LiLei
 * @Date: 2022-08-16 02:37:06
 * @LastEditors: LiLei
 * @LastEditTime: 2022-09-29 14:43:48
-->

<template>
    <a-form :model="formState"
            name="basic"
            :rules="rules"
            v-bind="formItemLayout"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed">
        <a-form-item label="积分充值卡密"
                     name="recharge_cdk"
                     has-feedback>
            <a-textarea v-model:value="formState.recharge_cdk">
            </a-textarea>
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 3, span: 16 }">
            <a-button type="primary"
                      style="width:100%;"
                      html-type="submit">充值</a-button>
        </a-form-item>
    </a-form>
</template>
<script setup>
import { reactive } from 'vue';
import {
    userIntegralRecharge
} from "utils/api.js";
import {
    commonUtil
} from '@/utils/store';
import { message } from "ant-design-vue";

const formState = reactive({
    recharge_cdk: ""
});
const rules = {

    recharge_cdk: [{
        required: true,
        trigger: 'change',
        message: '请输入积分充值卡密!'
    }],
};
const formItemLayout = {
    labelCol: {
        span: 3,
    },
    wrapperCol: {
        span: 16,
    },
};
const onFinish = values => {
    console.log('Success:', values);
    userIntegralRecharge({ data: formState }).then(() => {
        message.success("积分充值成功");
        commonUtil.getUserSmsInfo(true);
    })
};

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};


</script>
