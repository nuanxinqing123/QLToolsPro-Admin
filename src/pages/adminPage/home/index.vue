<!--
 * @Descripttion: 管理总览
 * @Author: LiLei
 * @Date: 2022-09-29 15:24:11
 * @LastEditors: LiLei
 * @LastEditTime: 2022-11-07 11:14:39
-->
<template>
    <page-container @initData="getData"
                    isScroll>
        <template #top>
            <div class="page-overview">

                <a-row :gutter="16">

                    <a-col :span="12">
                        <a-descriptions title="当前生效的面板数量">
                            <a-descriptions-item label="">
                                <!-- <span v-html="homeObj.panel_count"></span> -->
                                <count-animation :num="homeObj.panel_count"></count-animation>
                            </a-descriptions-item>
                        </a-descriptions>
                        <!-- <a-statistic title="当前生效的面板数量"
                                 :value="homeObj.panel_count"
                                 style="margin-right: 50px;margin-bottom: 50px;" /> -->
                    </a-col>
                    <a-col :span="12">
                        <a-descriptions title="当前生效的变量数量">
                            <a-descriptions-item label="">
                                <!-- <span v-html="homeObj.env_count"></span> -->
                                <count-animation :num="homeObj.env_count"></count-animation>
                            </a-descriptions-item>
                        </a-descriptions>
                        <!-- <a-statistic title="当前生效的变量数量"
                                 :value="homeObj.env_count" /> -->
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-descriptions title="网站注册用户数量">
                            <a-descriptions-item label="">
                                <!-- <span v-html="homeObj.user_count"></span> -->
                                <count-animation :num="homeObj.user_count"></count-animation>

                            </a-descriptions-item>
                        </a-descriptions>
                        <!-- <a-statistic title="网站注册用户数量"
                                 :value="homeObj.user_count"
                                 style="margin-right: 50px;margin-bottom: 50px;" /> -->
                    </a-col>
                    <a-col :span="12">
                        <a-descriptions title="网站会员用户数量">
                            <a-descriptions-item label="">
                                <!-- <span v-html="homeObj.vip_user_count"></span> -->
                                <count-animation :num="homeObj.vip_user_count"></count-animation>

                            </a-descriptions-item>
                        </a-descriptions>
                        <!-- <a-statistic title="网站会员用户数量"
                                 :value="homeObj.vip_user_count" /> -->
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-descriptions title="今日消费积分数量">
                            <a-descriptions-item label="">
                                <!-- <span v-html="homeObj.to_day_integral"></span> -->
                                <count-animation :num="homeObj.to_day_integral"></count-animation>

                            </a-descriptions-item>
                        </a-descriptions>
                        <!-- <a-statistic title="今日消费积分数量"
                                 :value="homeObj.to_day_integral"
                                 style="margin-right: 50px;margin-bottom: 50px;" /> -->
                    </a-col>
                    <a-col :span="12">
                        <a-descriptions title="今日上传变量数量">
                            <a-descriptions-item label="">
                                <count-animation :num="homeObj.to_day_upload_count"></count-animation>

                                <!-- <span v-html="homeObj.to_day_upload_count"></span> -->
                            </a-descriptions-item>
                        </a-descriptions>
                        <!-- <a-statistic title="今日上传变量数量"
                                 :value="homeObj.to_day_upload_count" /> -->
                    </a-col>
                </a-row>
                <!-- <a-descriptions title="系统版本">
                <a-descriptions-item label="">{{webData.Version}}</a-descriptions-item>
            </a-descriptions> -->
                <a-descriptions title="公告">
                    <a-descriptions-item label=""
                                         class="ant-descriptions-item-block">
                        <div v-html="webData.Notice"></div>
                        <a-divider style="padding:5px 0;" />
                        程序版本：{{webData.LocVersion}}
                        <span v-if="webData.LocVersion !== webData.Version">【有最新版本可用，最新版本：{{webData.Version}}】</span>
                    </a-descriptions-item>
                </a-descriptions>
            </div>

        </template>
    </page-container>
</template>

<script setup>
import pageContainer from "@/components/page-container/page-container.vue";
import countAnimation from "@/components/count-animation/count-animation.vue";
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
        if (data.LocVersion !== data.Version) {
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
.page-overview {
    .ant-descriptions {
        border-radius: 6px;
        padding: 20px;
        margin-bottom: 20px;
    }
    .ant-row {
        .ant-descriptions-item-content {
            font-size: 30px;
        }
    }
}
</style>
