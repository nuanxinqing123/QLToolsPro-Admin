<!--
 * @Descripttion: 管理总览
 * @Author: LiLei
 * @Date: 2022-09-29 15:24:11
 * @LastEditors: LiLei
 * @LastEditTime: 2022-10-04 11:15:22
-->
<template>
    <a-row>
        <a-col :span="12">
            <a-statistic title="当前生效的面板数量"
                         :value="homeObj.panel_count"
                         style="margin-right: 50px;margin-bottom: 50px;" />
        </a-col>
        <a-col :span="12">
            <a-statistic title="当前生效的变量数量"
                         :value="homeObj.env_count" />
        </a-col>
    </a-row>
    <a-row>
        <a-col :span="12">
            <a-statistic title="网站注册用户数量"
                         :value="homeObj.user_count"
                         style="margin-right: 50px;margin-bottom: 50px;" />
        </a-col>
        <a-col :span="12">
            <a-statistic title="网站会员用户数量"
                         :value="homeObj.vip_user_count" />
        </a-col>
    </a-row>
    <a-row>
        <a-col :span="12">
            <a-statistic title="今日消费积分数量"
                         :value="homeObj.to_day_integral"
                         style="margin-right: 50px;margin-bottom: 50px;" />
        </a-col>
        <a-col :span="12">
            <a-statistic title="今日上传变量数量"
                         :value="homeObj.to_day_upload_count" />
        </a-col>
    </a-row>
</template>

<script setup>
import { ref } from 'vue';
import {
    homeData
} from "utils/api.js";
const homeObj = ref({
    "panel_count": 0, //当前生效的面板数量
    "env_count": 0, //当前生效的变量数量
    "user_count": 1, //网站注册用户数量
    "vip_user_count": 0, //网站会员用户数量
    "to_day_integral": 0, //今日消费积分数量
    "to_day_upload_count": 0 //今日上传变量数量
})
const getData = () => {
    homeData().then(data => {
        homeObj.value = data;
    })
}
getData();
</script>

<style lang="scss">
</style>
