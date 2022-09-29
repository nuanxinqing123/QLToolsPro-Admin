<template>
    <a-layout>
        <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
            <div class="home-logo text-center font-weight">
                <!-- 青龙Tools-Admin -->
                {{webTitle}}
            </div>
            <!-- <a-menu v-model:selectedKeys="selectedKeys"
                    theme="dark"
                    mode="horizontal"
                    :style="{ lineHeight: '64px' }">
                <a-menu-item key="1">nav 1</a-menu-item>
                <a-menu-item key="2">nav 2</a-menu-item>
                <a-menu-item key="3">nav 3</a-menu-item>
            </a-menu> -->
        </a-layout-header>
        <a-layout-content :style="{ padding: '20px 50px 0 50px', marginTop: '64px' }">
            <div :style="{ padding: '24px', minHeight: '380px' }"
                 class="flex flex-column align-center">
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
            </div>
        </a-layout-content>
        <a-layout-footer :style="{ textAlign: 'center' }">
            QingLongTools ©2022 Created by DaLong
        </a-layout-footer>
    </a-layout>
</template>
<script setup>
import { reactive, ref, toRefs } from 'vue';

import boxContainer from "components/box-container/box-container.vue";
import uploadData from "components/upload-data/upload-data.vue";

import {
    getSetting
} from "utils/api.js";
const webTitle = ref("");// 网站名称
const selectedKeys = ref(['2']);
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
    // 获取网站名称
    getSetting({
        splicingData: {
            key: "webTitle"
        }
    }).then((data) => {
        webTitle.value = data.value;
    });
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
        document.getElementById("app").style.backgroundImage = "url(" + backgroundImage.value + ")";
    });
}
getData();

</script>
<style lang="scss">
.ant-layout {
    /* background: #f0f2f5; */
    background: initial;
}
.home-logo {
    width: 120px;
    margin: 16px 24px 16px 0;
    float: left;
    line-height: 32px;
    color: #fff;
    // background: rgba(255, 255, 255, 0.3);
    font-size: 16px;
}
.site-layout .site-layout-background {
    background: #fff;
}

[data-theme="dark"] .site-layout .site-layout-background {
    background: #141414;
}

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
