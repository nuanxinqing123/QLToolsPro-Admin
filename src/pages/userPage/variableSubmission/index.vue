<!--
 * @Descripttion: Descripttion
 * @Author: LiLei
 * @Date: 2022-09-29 14:04:51
 * @LastEditors: LiLei
 * @LastEditTime: 2022-10-06 14:51:12
-->
<template>
    <page-container @initData="getData"
                    isScroll
                    isCenter>
        <template #top>
            <box-container title="网站公告"
                           :loading="pageData.webData.loading"
                           :isLoad="false">
                <template v-slot:content="{height}">
                    <div v-html="pageData.webData.data"></div>
                </template>
            </box-container>
            <box-container title="变量提交"
                           :loading="false"
                           :isLoad="false">
                <template v-slot:content="{height}">
                    <upload-data @tipChange="tipChange"></upload-data>
                </template>>
            </box-container>

            <box-container title="提示"
                           v-if="tipText">
                <template v-slot:content="{height}">
                    <div v-html="tipText"></div>
                </template>
            </box-container>
        </template>
    </page-container>
</template>
<script setup>
import { reactive, ref, toRefs, onMounted } from 'vue';
import pageContainer from "@/components/page-container/page-container.vue";
import boxContainer from "components/box-container/box-container.vue";
import uploadData from "components/upload-data/upload-data.vue";
import {
    getSetting
} from "utils/api.js";
const tipText = ref('');
const webTitle = ref("");// 网站名称
const selectedKeys = ref(['2']);
// 背景图片
const backgroundImage = ref('');
const pageData = reactive({
    webData: {
        loading: false,
        data: ""
    }
})

const tipChange = (text) => {
    tipText.value = text;
}
// 获取数据
const getData = () => {
    // 网站公告
    getSetting({
        splicingData: {
            key: "notice"
        }
    }).then((data) => {
        pageData.webData.data = data.value;
        pageData.webData.loading = false;
        console.log("datadatadata", data)
    });
}

</script>
