<!--
 * @Descripttion: 头部
 * @Author: LiLei
 * @Date: 2022-08-16 02:07:46
 * @LastEditors: LiLei
 * @LastEditTime: 2022-10-09 22:28:01
-->
<template>
    <a-page-header :title="activePage.title"
                   :class="isMobile?'mobile-header':''"
                   :sub-title="isMobile?'':activePage.content">
        <template #extra>
            <menu-fold-outlined :style="{fontSize: '16px'}"
                                v-if="isCollapsed && isMobile"
                                @click="setCollapsed" />
            <!-- 现在时间:{{tiemStr}} -->
            <span @click="setTop('2')"
                  class="pointer">
                <sketch-outlined style="margin-right:5px;" />会员： {{getUserSms.ActivationTime}}
            </span>
            <span @click="setTop('1')"
                  class="pointer">
                <dollar-outlined style="margin-right:5px;" />积分：{{getUserSms.Integral}}
            </span>
            <a-popconfirm placement="topLeft"
                          ok-text="是"
                          cancel-text="否"
                          @confirm="logoutLogin">
                <template #title>
                    是否确认退出？
                </template>
                <span class="pointer">
                    <logout-outlined style="margin-right:5px;" />退出登录
                </span>
            </a-popconfirm>
            <!-- <theme-color></theme-color> -->
        </template>
        <!-- {{activePage.content}} -->
    </a-page-header>
    <a-divider />
    <recharge-pop v-model:visible="isPop"
                  :type="type"></recharge-pop>

</template>

<script setup>
import { DollarOutlined, SketchOutlined, LogoutOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';

import { defineComponent, ref, onUnmounted } from 'vue';
// import themeColor from "components/theme-color/theme-color.vue";
import rechargePop from "@/components/recharge-pop/recharge-pop.vue";

import { useCommonUtilStore } from "stores/commonUtil";
const commonUtil = useCommonUtilStore();
const tiemStr = ref('');
const isPop = ref(false);
const type = ref("1");
import {
    storeToRefs
} from 'pinia'
// 生成响应式
const {
    isCollapsed,
    isMobile,
    getUserSms,
    activePage,
} = storeToRefs(commonUtil);
const setCollapsed = () => {
    commonUtil.setCollapsed(false);
}

const setTop = (t) => {
    type.value = t;
    isPop.value = true;
}
let times = null;

try {
    times = setInterval(() => {
        getAncientPoetry();
    }, 15000);

} catch (e) {
    //TODO handle the exception
}

// 获取古诗
const getAncientPoetry = () => {
    jinrishici.load(function (result) {
        commonUtil.$patch({
            activePage: {
                content: result.data.content,
            },
        });
    });
}
function get_time () {
    var obj = new Date();
    var y = obj.getFullYear();
    var m = obj.getMonth() + 1;
    var d = obj.getDate();
    var h = obj.getHours();
    var min = obj.getMinutes();
    var s = obj.getSeconds();
    let time = y + '年' + (m > 9 ? m : '0' + m) + '月' + (d > 9 ? d : '0' + d) + '日' + (h > 9 ? h : '0' +
        h) + '时' + (min > 9 ? min : '0' + min) + '分' + (s > 9 ? s : '0' + s) + '秒';
    tiemStr.value = time
}
// 退出登录
const logoutLogin = () => {
    localStorage.clear();
    commonUtil.navigateTo("login");
}
// const times = ref(null);

// times.value = setInterval(() => {
//     get_time();
// }, 1000);
// 关闭定时器
const closeTimes = () => {
    if (times) {
        clearInterval(times);
        times = null;
    }
}
onUnmounted(() => {
    closeTimes();
})
getAncientPoetry();
</script>

<style lang="scss">
.ant-page-header-heading-extra {
    line-height: 32px;
}
.mobile-header {
    .ant-page-header-heading-extra {
        white-space: initial;
    }
}
</style>
