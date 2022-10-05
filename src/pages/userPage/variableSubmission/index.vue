<template>
    <!-- <a-layout-content :style="{ padding: '20px 50px 0 50px', marginTop: '64px' }"> -->
    <div class="flex flex-column align-center home-page overflow-scroll"
         v-if="listHeight"
         :style="{'height':listHeight+'px'}">
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
    </div>
    <!-- </a-layout-content> -->
</template>
<script setup>
import { reactive, ref, toRefs, onMounted } from 'vue';

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
    // 获取网站名称
    // getSetting({
    //     splicingData: {
    //         key: "web_title"
    //     }
    // }).then((data) => {
    //     webTitle.value = data.value;
    // });
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
    // getSetting({
    //     splicingData: {
    //         key: "backgroundImage"
    //     }
    // }).then((data) => {
    //     backgroundImage.value = data.value;
    //     document.getElementById("app").style.backgroundImage = "url(" + backgroundImage.value + ")";
    // });
}
// 获取高度
const listHeight = ref(0);
onMounted(() => {
    widthProcessing()
    // 监听屏幕变化
    window.addEventListener("resize", () => {
        // 获取屏幕高度
        widthProcessing();
    });
    getData();

});
// 监听宽度
const widthProcessing = () => {
    // 获取屏幕高度
    let winWidth = window.innerWidth || document.body.clientWidth;

    if (winWidth < 575) {
        listHeight.value = 300;
    } else {
        try {
            setTimeout(() => {
                try {
                    listHeight.value = document.getElementsByClassName("page-container")[0].clientHeight - 64;

                } catch (error) {
                    console.log("errorerrorerror", error, document.getElementsByClassName("page-container")[0])
                }
            }, 0);
        } catch (error) {

        }
    }
}

</script>
<style lang="scss">
.home-page {
    width: 100%;
    padding: 15px;
    height: 100%;
}
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
