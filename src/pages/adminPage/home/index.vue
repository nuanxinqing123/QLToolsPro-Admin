<!--
 * @Descripttion: 管理总览
 * @Author: LiLei
 * @Date: 2022-09-29 15:24:11
 * @LastEditors: LiLei
 * @LastEditTime: 2022-10-08 18:03:46
-->
<template>
    <page-container @initData="getData">
        <template #top>
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
            <!-- <a-descriptions title="系统版本">
                <a-descriptions-item label="">{{webData.Version}}</a-descriptions-item>
            </a-descriptions> -->
            <a-descriptions title="公告">
                <a-descriptions-item label="">
                    <span v-html="webData.Notice"></span>
                </a-descriptions-item>
            </a-descriptions>
        </template>
    </page-container>
</template>

<script setup>
import pageContainer from "@/components/page-container/page-container.vue";
import { notification } from 'ant-design-vue';
import { ref } from 'vue';
import {
    webEdition,
    homeData
} from "utils/api.js";
const homeObj = ref({
    "panel_count": 0, //当前生效的面板数量
    "env_count": 0, //当前生效的变量数量
    "user_count": 0, //网站注册用户数量
    "vip_user_count": 0, //网站会员用户数量
    "to_day_integral": 0, //今日消费积分数量
    "to_day_upload_count": 0 //今日上传变量数量
})
const webData = ref({})
const getData = () => {
    webEdition().then((data) => {
        webData.value = data;
        if (webData.LocVersion !== webData.Version) {
            notification.info({
                message: '温馨提示',
                duration: 5,
                description: '有更新可用',
            });
        }

    })
    homeData().then(data => {
        homeObj.value = data;
    })
}
</script>

<style lang="scss">
</style>
