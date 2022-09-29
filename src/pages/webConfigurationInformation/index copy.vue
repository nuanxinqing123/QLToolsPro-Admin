<!--
 * @Descripttion: 网站配置信息
 * @Author: LiLei
 * @Date: 2022-08-16 02:37:06
 * @LastEditors: LiLei
 * @LastEditTime: 2022-08-16 13:04:23
-->

<template>
    <a-form :model="formState"
            name="basic"
            :label-col="{ span: 2 }"
            :wrapper-col="{ span: 10 }"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed">
        <a-form-item name="key"
                     label="获取内容"
                     has-feedback
                     :rules="[{ required: true, message: '请选择获取内容!' }]">
            <a-select v-model:value="formState.key"
                      placeholder="请选择获取内容!">
                <a-select-option value="notice">网站公告</a-select-option>
                <a-select-option value="backgroundImage">网站背景</a-select-option>
                <a-select-option value="webTitle">网站名称</a-select-option>
            </a-select>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 2, span: 10 }">
            <a-button type="primary"
                      html-type="submit">获取</a-button>
        </a-form-item>
    </a-form>

</template>
<script setup>
import { reactive, ref } from 'vue';
import {
    getSetting
} from "utils/api.js";


const formState = reactive({
    key: 'notice',
});
const onFinish = values => {
    getSetting({
        splicingData: values
    })
    console.log('Success:', values);
};

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};


</script>
