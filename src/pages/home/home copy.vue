<!--
 * @Descripttion: 首页
 * @Author: LiLei
 * @Date: 2022-08-16 13:19:48
 * @LastEditors: LiLei
 * @LastEditTime: 2022-08-16 16:07:20
-->
<template>
    <div class="page-home flex flex-column align-items bg-base"
         :style="{backgroundImage:'url('+backgroundImage+')'}">
        <a-page-header class="page-home-header"
                       title="Title"
                       footer
                       sub-title="This is a subtitle"
                       @back="() => null" />
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
                <upload-data></upload-data>
            </template>>
        </box-container>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, facere, assumenda recusandae aliquid eum dicta laudantium vitae ad voluptatem, accusamus error ducimus veritatis inventore nam quia in ullam. Animi, laboriosam? ipsum dolor sit amet consectetur adipisicing elit. Illo earum cum molestias veritatis, culpa sit nisi, fugiat quasi adipisci autem voluptas nulla praesentium. Dolor, maxime quos. Officiis incidunt blanditiis commodi! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, facere, assumenda recusandae aliquid eum dicta laudantium vitae ad voluptatem, accusamus error ducimus veritatis inventore nam quia in ullam. Animi, laboriosam? ipsum dolor sit amet consectetur adipisicing elit. Illo earum cum molestias veritatis, culpa sit nisi, fugiat quasi adipisci autem voluptas nulla praesentium. Dolor, maxime quos. Officiis incidunt blanditiis commodi! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, facere, assumenda recusandae aliquid eum dicta laudantium vitae ad voluptatem, accusamus error ducimus veritatis inventore nam quia in ullam. Animi, laboriosam? ipsum dolor sit amet consectetur adipisicing elit. Illo earum cum molestias veritatis, culpa sit nisi, fugiat quasi adipisci autem voluptas nulla praesentium. Dolor, maxime quos. Officiis incidunt blanditiis commodi! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, facere, assumenda recusandae aliquid eum dicta laudantium vitae ad voluptatem, accusamus error ducimus veritatis inventore nam quia in ullam. Animi, laboriosam? ipsum dolor sit amet consectetur adipisicing elit. Illo earum cum molestias veritatis, culpa sit nisi, fugiat quasi adipisci autem voluptas nulla praesentium. Dolor, maxime quos. Officiis incidunt blanditiis commodi! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, facere, assumenda recusandae aliquid eum dicta laudantium vitae ad voluptatem, accusamus error ducimus veritatis inventore nam quia in ullam. Animi, laboriosam? ipsum dolor sit amet consectetur adipisicing elit. Illo earum cum molestias veritatis, culpa sit nisi, fugiat quasi adipisci autem voluptas nulla praesentium. Dolor, maxime quos. Officiis incidunt blanditiis commodi! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, facere, assumenda recusandae aliquid eum dicta laudantium vitae ad voluptatem, accusamus error ducimus veritatis inventore nam quia in ullam. Animi, laboriosam? ipsum dolor sit amet consectetur adipisicing elit. Illo earum cum molestias veritatis, culpa sit nisi, fugiat quasi adipisci autem voluptas nulla praesentium. Dolor, maxime quos. Officiis incidunt blanditiis commodi! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, facere, assumenda recusandae aliquid eum dicta laudantium vitae ad voluptatem, accusamus error ducimus veritatis inventore nam quia in ullam. Animi, laboriosam? ipsum dolor sit amet consectetur adipisicing elit. Illo earum cum molestias veritatis, culpa sit nisi, fugiat quasi adipisci autem voluptas nulla praesentium. Dolor, maxime quos. Officiis incidunt blanditiis commodi! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, facere, assumenda recusandae aliquid eum dicta laudantium vitae ad voluptatem, accusamus error ducimus veritatis inventore nam quia in ullam. Animi, laboriosam? ipsum dolor sit amet consectetur adipisicing elit. Illo earum cum molestias veritatis, culpa sit nisi, fugiat quasi adipisci autem voluptas nulla praesentium. Dolor, maxime quos. Officiis incidunt blanditiis commodi!
    </div>
</template>

<script setup>
import { reactive, ref, toRefs } from 'vue';

import boxContainer from "components/box-container/box-container.vue";
import uploadData from "components/upload-data/upload-data.vue";

import {
    getSetting
} from "utils/api.js";
// 背景图片
const backgroundImage = ref('');
const pageData = reactive({
    webData: {
        loading: false,
        data: {}
    }
})

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
    // 获取背景
    getSetting({
        splicingData: {
            key: "backgroundImage"
        }
    }).then((data) => {
        backgroundImage.value = data.value;
    });
}
getData();
</script>

<style lang="scss">
.page-home {
    width: 100%;
    padding: 0 20px;
    min-height: 100vh;
    background-color: #f2f2f2;
    .page-home-header {
        width: 100%;
        background-color: #fff;
    }
}
</style>
