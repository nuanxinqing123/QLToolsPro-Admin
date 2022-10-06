<!--
 * @Descripttion: Descripttion
 * @Author: LiLei
 * @Date: 2021-05-11 17:01:36
 * @LastEditors: LiLei
 * @LastEditTime: 2022-10-06 16:36:21
-->
<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider v-model:collapsed="collapsed"
                        :class="commonUtil.siteSettings.web_bg?'slide-hide-bg':''"
                        collapsible>

            <a-image :width="70"
                     :preview="false"
                     :src="commonUtil.siteSettings.web_logo"
                     v-if="commonUtil.siteSettings.web_logo" />
            <div class="page-logo text-center font-weight"
                 v-else>
                {{!collapsed?'青龙Tools Pro':"青"}}
            </div>
            <a-menu v-model:selectedKeys="selectedKeys"
                    theme="dark"
                    mode="inline">
                <a-menu-item key="1"
                             @click="goPage('variableSubmission','1')">

                    <build-outlined />

                    <span>变量提交</span>
                </a-menu-item>
                <a-menu-item key="2"
                             @click="goPage('recharge','2')">
                    <pay-circle-outlined />
                    <span>充值服务</span>
                </a-menu-item>
                <a-sub-menu key="sub2">
                    <template #icon>
                        <book-outlined />
                    </template>
                    <template #title>操作记录</template>
                    <a-menu-item key="4"
                                 @click="goPage('rechargeRecord','3')">充值记录</a-menu-item>
                    <a-menu-item key="5"
                                 @click="goPage('uploadRecords','4')">上传记录</a-menu-item>
                </a-sub-menu>
                <!-- <a-menu-item key="2"
                             @click="goPage('rechargePoints','2')">
                    <pie-chart-outlined />
                    <span>CDK状态检查</span>
                </a-menu-item>
                <a-menu-item key="3"
                             @click="goPage('panelInfoObtain','3')">
                    <team-outlined />
                    <span>面板：信息获取</span>
                </a-menu-item>
                <a-menu-item key="4"
                             @click="goPage('uploadVariables','4')">
                    <file-outlined />
                    <span>上传变量</span>
                </a-menu-item> -->
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <p-header></p-header>
            <a-layout-content>
                <div :style="{ height: '100%',marginTop:'15px'
                     }"
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
import { BuildOutlined, PayCircleOutlined, BookOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, computed, onMounted } from 'vue';
import pHeader from "components/header/header.vue";
import pFooter from "@/components/footer/footer.vue";
import router from "@/router";
import { commonUtil } from "@/utils/store";
const collapsed = ref(false);
const selectedKeys = ref(commonUtil.pageKeys);
const routerPageRef = ref(null);
onMounted(() => {
    // 计算容器高度，需要减去15的头部高度
    let routerPageHeight = routerPageRef.value.clientHeight || routerPageRef.value.$el.clientHeight;
    commonUtil.setRouterPageHeight(routerPageHeight - 15);
    // 监听屏幕大小变化
    window.addEventListener("resize", () => {
        let routerPageHeight = routerPageRef.value.clientHeight || routerPageRef.value.$el.clientHeight;
        commonUtil.setRouterPageHeight(routerPageHeight - 15);
    });
})


const goPage = (name, key) => {
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

