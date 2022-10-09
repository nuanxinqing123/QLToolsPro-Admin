<!--
 * @Descripttion: Descripttion
 * @Author: LiLei
 * @Date: 2021-05-10 13:30:49
 * @LastEditors: LiLei
 * @LastEditTime: 2022-10-09 11:18:34
-->
<template>
    <a-config-provider :locale="zhCN">
        <router-view v-if="isShow"></router-view>
        <loading></loading>
    </a-config-provider>
</template>
<script setup>
import { ref, nextTick, provide, onMounted } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import loading from "./components/loading/loading.vue";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('cn');
const isShow = ref(true);
// 初始化设置网站信息
import { useCommonUtilStore } from "stores/commonUtil";
const commonUtil = useCommonUtilStore();
commonUtil.getWebSetting(true);
const reload = () => {
    //reload方法首先将isShow设置为false，将router-view通过if判断取消
    isShow.value = false;
    // Vue.nextTick用于延迟执行一段代码，它接受2个参数（回调函数和执行回调函数的上下文环境），如果没有提供回调函数，那么将返回promise对象。
    nextTick(function () {
        //     在页面更新后再将isShow设置为true
        isShow.value = true;
    })
}
provide('reload', reload); // provide的第一个为名称，第二个值为所需要传的参数
// 判断手机还是pc
const isMobileFuc = () => {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    commonUtil.setMobile(flag ? true : false);
}
isMobileFuc();

// 判断手机还是pc
onMounted(() => {
    isMobileFuc()
    // 监听屏幕变化
    window.addEventListener("resize", () => {
        setTimeout(() => {
            isMobileFuc();
        }, 5);
    })
})
</script>
<style lang="scss">
@import "./App.scss";
</style>
