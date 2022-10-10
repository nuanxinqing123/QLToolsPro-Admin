<!--
 * @Descripttion: 网页底部
 * @Author: LiLei
 * @Date: 2022-10-06 16:25:58
 * @LastEditors: LiLei
 * @LastEditTime: 2022-10-10 20:46:30
-->
<template>
    <a-layout-footer style="text-align: center"
                     :class="commonUtil.siteSettings.web_bg?'footer-hide-bg':''">
        Copyright © 2022 All rights reserved. {{commonUtil.siteSettings.web_title || '青龙Tools Pro'}}
    </a-layout-footer>
</template>

<script setup>
import { useCommonUtilStore } from "stores/commonUtil";
const commonUtil = useCommonUtilStore();
</script>

<style lang="scss">
.footer-hide-bg {
    background: initial;
    box-shadow: 5px 0 5px 0 rgb(60 64 67 / 30%),
        0 1px 3px 1px rgb(60 64 67 / 15%);
    backdrop-filter: blur(15px) brightness(110%);
}
</style>
