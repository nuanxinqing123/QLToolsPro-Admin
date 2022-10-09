<!--
 * @Descripttion: loading提示
 * @Author: LiLei
 * @Date: 2021-10-26 14:14:42
 * @LastEditors: LiLei
 * @LastEditTime: 2022-10-09 10:31:31
-->
<template>
    <div v-show="isLoading"
         class="page-loading flex align-items">
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
    background-color: rgba($color: #000000, $alpha: 0.1);
}

.block {
    width: 120px;
    height: 120px;
    background-color: rgba($color: #000000, $alpha: 0.6);
    border-radius: 20px;
}
</style>
