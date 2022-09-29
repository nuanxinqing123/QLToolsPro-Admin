<!--
 * @Descripttion: 管理总览
 * @Author: LiLei
 * @Date: 2022-09-29 15:24:11
 * @LastEditors: LiLei
 * @LastEditTime: 2022-09-29 15:28:44
-->
<template>
    <div>
        管理总览
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import {
    homeData
} from "utils/api.js";

const getData = () => {
    homeData()
}
getData();
</script>

<style lang="scss">
</style>
