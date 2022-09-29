<!--
 * @Descripttion: CDK状态检查
 * @Author: LiLei
 * @Date: 2022-08-16 02:37:06
 * @LastEditors: LiLei
 * @LastEditTime: 2022-08-16 03:36:45
-->

<template>
    <a-form :model="formState"
            name="basic"
            :label-col="{ span: 2 }"
            :wrapper-col="{ span: 10 }"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed">
        <a-form-item name="cdk"
                     label="用户认证令牌"
                     has-feedback
                     :rules="[{ required: true, message: '请输入用户认证令牌!' }]">
            <a-input v-model:value="formState.cdk"
                     placeholder="请输入用户认证令牌!">
            </a-input>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 2, span: 10 }">
            <a-button type="primary"
                      html-type="submit">检测</a-button>
        </a-form-item>
    </a-form>
</template>
<script setup>
import { reactive } from 'vue';
import {
    postCdk
} from "utils/api.js";
const formState = reactive({
    cdk: '',
});

const onFinish = values => {
    postCdk({
        data: values
    })
    console.log('Success:', values);
};

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};


</script>
