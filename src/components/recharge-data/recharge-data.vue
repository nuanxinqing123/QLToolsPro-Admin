<!--
 * @Descripttion: 充值
 * @Author: LiLei
 * @Date: 2022-08-16 02:37:06
 * @LastEditors: LiLei
 * @LastEditTime: 2022-10-11 15:17:53
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
        <template v-if="isAdminRecharge">

            <a-form-item label="充值数量"
                         v-if="formState.type==1"
                         name="recharge_number">
                <a-input-number v-model:value="formState.recharge_number"
                                placeholder="请输入充值数量"
                                style="width：100%;" />
            </a-form-item>
            <a-form-item label="充值天数"
                         v-if="formState.type==2"
                         name="recharge_number">
                <a-input-number v-model:value="formState.recharge_number"
                                placeholder="请输入充值天数"
                                style="width：100%;" />
            </a-form-item>
        </template>

        <template v-else>

            <a-form-item :label="formState.type==1?'积分充值卡密':'会员充值卡密'"
                         name="recharge_cdk"
                         has-feedback>
                <a-textarea v-model:value="formState.recharge_cdk"
                            placeholder="请输入卡密">
                </a-textarea>
            </a-form-item>
        </template>

        <a-form-item :wrapper-col="{ offset: 5, span: 16 }">
            <a-button type="primary"
                      style="width:100%;"
                      html-type="submit">充值</a-button>
        </a-form-item>
    </a-form>
</template>
<script setup>
import { reactive, computed, ref } from 'vue';

import {
    userRecharge,
    userIntegralRecharge,
    memberRecharge
} from "utils/api.js";
import {
    commonUtil
} from '@/utils/store';
import {
    stringToNumber
} from '@/utils/common';
import { message } from "ant-design-vue";
const emit = defineEmits(['close', 'updateData']);
const rechargeObj = ref({});
const isAdminRecharge = ref(false);
const setType = (type, item) => {
    if (type == '3') {
        isAdminRecharge.value = true;
        rechargeObj.value = item;

    } else {
        isAdminRecharge.value = false;
        formState.type = type;
        formState.recharge_cdk = '';
        rechargeObj.value = {};

    }

}
defineExpose({
    setType
})
const formState = reactive({
    type: "1",
    recharge_number: undefined,
    recharge_cdk: ""
});
const rules = computed(() => {
    return {
        recharge_number: [{
            required: true,
            trigger: 'change',
            message: formState.type == 1 ? '请输入充值数量!' : '请输入充值天数!'

        }],
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
        span: 5,
    },
    wrapperCol: {
        span: 16,
    },
};
const onFinish = values => {
    console.log('Success:', values);
    let postFuc = formState.type == 1 ? userIntegralRecharge : memberRecharge;
    let postData = {};
    if (isAdminRecharge.value) {
        postFuc = userRecharge;
        postData = {
            "user_id": rechargeObj.value.UserID,
            "recharge_type": stringToNumber(formState.type),
            "recharge_number": stringToNumber(formState.recharge_number)
        }
    } else {
        postData = {
            type: formState.type,
            recharge_cdk: formState.recharge_cdk
        };
    }

    postFuc({ data: postData }).then(() => {
        message.success(formState.type == 1 ? "积分充值成功" : '会员充值成功');
        if (isAdminRecharge.value) {
            if (commonUtil.userSms.UserID == rechargeObj.value.UserID) {
                commonUtil.getUserSmsInfo(true);
            }
            formState.recharge_number = undefined;
            formState.recharge_cdk = '';
            emit("close");
            emit("updateData");
        } else {
            formState.recharge_cdk = '';
            commonUtil.getUserSmsInfo(true);
        }
    })
};

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};


</script>

<style lang="scss">
.ant-input-number {
    width: 100%;
}
</style>
