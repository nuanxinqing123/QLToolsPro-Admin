<!--
 * @Descripttion: 主题颜色
 * @Author: LiLei
 * @Date: 2022-08-16 03:47:38
 * @LastEditors: LiLei
 * @LastEditTime: 2022-08-16 04:12:49
-->
<template>
    <color-picker v-model:pureColor="pureColor"
                  format="hex6"
                  v-model:gradientColor="gradientColor" />
</template>

<script setup>
import { commonUtil } from "utils/store";

import { ref, watch } from 'vue';
const pureColor = ref("#001528");
const gradientColor = ref("linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)");


const setThemeColor = (newName) => {
    let root = document.documentElement
    root.style.setProperty('--system-color-', newName);
    commonUtil.saveItem('themeColor', newName);
}

watch(pureColor, (newName, oldName) => {
    console.log("newName", newName);
    setThemeColor(newName);
});
if (commonUtil.getItem('themeColor')) {
    pureColor.value = commonUtil.getItem('themeColor');
    setThemeColor(pureColor.value);
}
</script>

<style lang="scss">
</style>
