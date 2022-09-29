<!--
 * @Descripttion: 获取面板信息
 * @Author: LiLei
 * @Date: 2022-08-16 02:37:06
 * @LastEditors: LiLei
 * @LastEditTime: 2022-08-16 13:11:06
-->

<template>
    <a-form :model="formState"
            name="basic"
            :label-col="{ span: 0 }"
            :wrapper-col="{ span: 10 }"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed">

        <a-form-item :wrapper-col="{ offset: 0, span: 10 }">
            <a-button type="primary"
                      html-type="submit">获取</a-button>
        </a-form-item>
    </a-form>
</template>
<script setup>
import { reactive } from 'vue';
import {
    getPanelData
} from "utils/api.js";
const formState = reactive({});

const onFinish = values => {
    getPanelData({})
    console.log('Success:', values);
};

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};


</script>
