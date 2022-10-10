<!--
 * @Descripttion: Descripttion
 * @Author: LiLei
 * @Date: 2021-05-11 17:01:36
 * @LastEditors: LiLei
 * @LastEditTime: 2022-10-10 20:45:50
-->
<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider v-model:collapsed="isCollapsed"
                        :class="commonUtil.siteSettings.web_bg?'slide-hide-bg':''"
                        :collapsible="true">
            <!-- <template v-if="(!isCollapsed && isMobile) || !isMobile"> -->

            <a-image :width="70"
                     :preview="false"
                     :src="commonUtil.siteSettings.web_logo"
                     v-if="commonUtil.siteSettings.web_logo" />
            <div class="page-logo text-center font-weight"
                 v-else>
                {{commonUtil.siteSettings.web_title || '青龙Tools Pro'}}
                <!-- {{!isCollapsed?'青龙Tools Pro':"青"}} -->
            </div>
            <!-- </template> -->

            <a-menu v-model:selectedKeys="selectedKeys"
                    theme="dark"
                    mode="inline">
                <a-menu-item key="13"
                             @click="goPage('adminHome','1')">
                    <home-outlined />
                    <span>首页</span>
                </a-menu-item>
                <a-menu-item key="1"
                             @click="goPage('home','1')">
                    <pie-chart-outlined />
                    <span>总览</span>
                </a-menu-item>

                <a-menu-item key="2"
                             @click="goPage('panelManagement','2')">
                    <appstore-outlined />
                    <span>面板管理</span>
                </a-menu-item>
                <a-menu-item key="8"
                             @click="goPage('variableManagement','8')">
                    <build-outlined />
                    <span>变量管理</span>
                </a-menu-item>
                <a-menu-item key="4"
                             @click="goPage('messagePushManagement','4')">
                    <send-outlined />
                    <span>消息推送管理</span>
                </a-menu-item>
                <a-menu-item key="12"
                             @click="goPage('containerManagement','12')">
                    <shrink-outlined />
                    <span>容器管理</span>
                </a-menu-item>
                <a-menu-item key="10"
                             @click="goPage('plugInManagement','10')">
                    <cloud-server-outlined />
                    <span>插件管理</span>
                </a-menu-item>

                <a-menu-item key="3"
                             @click="goPage('userManagement','3')">
                    <usergroup-delete-outlined />
                    <span>用户管理</span>
                </a-menu-item>

                <a-menu-item key="5"
                             @click="goPage('userVariableManagement','5')">
                    <user-delete-outlined />
                    <span>用户变量管理</span>
                </a-menu-item>

                <a-menu-item key="9"
                             @click="goPage('cardSecretManagement','9')">
                    <credit-card-outlined />
                    <span>卡密管理</span>
                </a-menu-item>
                <a-sub-menu key="sub1">
                    <template #icon>
                        <database-outlined />
                    </template>

                    <template #title>数据查询</template>
                    <a-menu-item key="6"
                                 @click="goPage('rechargeData','6')">充值数据</a-menu-item>
                    <a-menu-item key="7"
                                 @click="goPage('uploadData','7')">上传记录</a-menu-item>
                </a-sub-menu>

                <a-menu-item key="11"
                             @click="goPage('webSettings','10')">
                    <setting-outlined />
                    <span>网站设置</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <p-header></p-header>
            <a-layout-content>
                <!-- <div :style="{ padding: '24px', background: '#fff', height: '100%',marginTop:'15px' -->
                <div :style="{ height: '100%' }"
                     ref="routerPageRef"
                     class="flex flex-column page-container">
                    <router-view></router-view>

                </div>
            </a-layout-content>
            <p-footer></p-footer>
        </a-layout>
    </a-layout>
</template>
<script setup>
import { PieChartOutlined, SettingOutlined, UsergroupDeleteOutlined, SendOutlined, UserDeleteOutlined, DatabaseOutlined, CreditCardOutlined, CloudServerOutlined, BuildOutlined, ShrinkOutlined, AppstoreOutlined, HomeOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, computed, onMounted } from 'vue';
import pHeader from "@/components/header/header.vue";
import pFooter from "@/components/footer/footer.vue";
import router from "@/router";
import { commonUtil } from "@/utils/store";
// const collapsed = ref(false);
import {
    storeToRefs
} from 'pinia'
// 生成响应式
const {
    isMobile,
    isCollapsed
} = storeToRefs(commonUtil);

const selectedKeys = ref(commonUtil.pageKeys);
const routerPageRef = ref(null);
onMounted(() => {
    // 计算容器高度，---需要减去15的头部高度,暂时去除
    let routerPageHeight = routerPageRef.value.clientHeight || routerPageRef.value.$el.clientHeight;
    commonUtil.setRouterPageHeight(routerPageHeight);
    // 监听屏幕大小变化
    window.addEventListener("resize", () => {
        let routerPageHeight = routerPageRef.value.clientHeight || routerPageRef.value.$el.clientHeight;
        commonUtil.setRouterPageHeight(routerPageHeight);
    });
})

const goPage = (name, key) => {
    if (isMobile.value) {
        commonUtil.setCollapsed(true);
    }
    router.push({
        name: name,
    });
    try {
        // selectedKeys.value = [key];
    } catch (e) {
        //TODO handle the exception
    }
};

</script>
<style lang="scss">
.page-logo {
    line-height: 32px;
    margin: 16px;
    color: #fff;
    background: rgba(255, 255, 255, 0.3);
    font-size: 14px;
}
.ant-image {
    left: 50%;
    margin-left: -35px;
}
.site-layout .site-layout-background {
    background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
    background: #141414;
}
.ant-layout-sider {
    background-color: var(--system-color-);
}
.ant-menu.ant-menu-dark {
    background-color: var(--system-color-);
}
// background-color: var(--system-color-) !important;
</style>

