<!--
 * @Descripttion: 充值
 * @Author: LiLei
 * @Date: 2022-08-16 02:37:06
 * @LastEditors: LiLei
 * @LastEditTime: 2022-10-05 08:45:22
-->

<template>

    <a-form :model="formState"
            name="basic"
            :rules="rules"
            v-bind="formItemLayout"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed">
        <a-form-item label="充值类型"
                     name="type">
            <a-radio-group v-model:value="formState.type">
                <a-radio value="1"
                         name="type">积分充值</a-radio>
                <a-radio value="2"
                         name="type">会员充值</a-radio>
            </a-radio-group>
        </a-form-item>
        <a-form-item :label="formState.type==1?'积分充值卡密':'会员充值卡密'"
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
import { reactive, computed, watch, toRefs } from 'vue';

import {
    userIntegralRecharge,
    memberRecharge
} from "utils/api.js";
import {
    commonUtil
} from '@/utils/store';
import { message } from "ant-design-vue";
const props = defineProps({
    type: String,
});
const {
    type
} = toRefs(props);
// 定义 watch 监听
watch(
    type,
    (newCount, old, clear) => {
        // 如果 watch 监听被重复执行了，则会先清除上次未完成的异步任务
        formState.type = type.value;
    }
    // watch 刚被创建的时候不执行
    // { lazy: true }
);


const formState = reactive({
    type: "1",
    recharge_cdk: ""
});
const rules = computed(() => {
    return {
        type: [{
            required: true,
            trigger: 'change',
        }],
        recharge_cdk: [{
            required: true,
            trigger: 'change',
            message: formState.type == 1 ? '请输入积分充值卡密!' : '请输入会员充值卡密!'
        }],
    }
});
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
    const postFuc = formState.type == 1 ? userIntegralRecharge : memberRecharge;

    postFuc({ data: formState }).then(() => {
        message.success(formState.type == 1 ? "积分充值成功" : '会员充值成功');
        commonUtil.getUserSmsInfo(true);
    })
};

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};


</script>
