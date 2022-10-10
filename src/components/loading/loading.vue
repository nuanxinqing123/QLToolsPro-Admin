<!--
 * @Descripttion: loading提示
 * @Author: LiLei
 * @Date: 2021-10-26 14:14:42
 * @LastEditors: LiLei
 * @LastEditTime: 2022-10-10 11:30:50
-->
<template>
    <div v-show="isLoading"
         class="page-loading flex align-items">
        <template v-if="!isMobile">
            <div style="width:80px;"
                 v-if="isCollapsed"></div>
            <div style="width:200px;"
                 v-else></div>
        </template>

        <a-spin tip="数据加载中，请稍候..."
                size="large">
        </a-spin>
    </div>
</template>

<script setup>
// import {
//     commonUtil,
// } from 'utils/store.js';
import { useCommonUtilStore } from "stores/commonUtil";
const commonUtil = useCommonUtilStore();

import {
    storeToRefs
} from 'pinia'
// 生成响应式
const {
    isMobile,
    isCollapsed,
    isLoading,
} = storeToRefs(commonUtil);
</script>

<style lang="scss">
.page-loading {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background-color: rgba($color: #000000, $alpha: 0.2);
}

// .block {
//     width: 120px;
//     height: 120px;
//     margin-left: 200px;
//     background-color: rgba($color: #000000, $alpha: 0.6);
//     border-radius: 20px;
// }
</style>
