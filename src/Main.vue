<!--
 * @Descripttion: Descripttion
 * @Author: LiLei
 * @Date: 2021-05-11 17:01:36
 * @LastEditors: LiLei
 * @LastEditTime: 2022-10-05 10:23:52
-->
<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider v-model:collapsed="collapsed"
                        collapsible>
            <div class="page-logo text-center font-weight">
                {{!collapsed?'青龙Tools Pro':"青"}}
            </div>
            <a-menu v-model:selectedKeys="selectedKeys"
                    theme="dark"
                    mode="inline">
                <a-menu-item key="1"
                             @click="goPage('variableSubmission','1')">
                    <!-- <template #icon>
                        <MailOutlined />
                    </template> -->
                    <span>变量提交</span>
                </a-menu-item>
                <a-menu-item key="2"
                             @click="goPage('recharge','2')">
                    <span>充值服务</span>
                </a-menu-item>
                <a-sub-menu key="sub2">
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
            <a-layout-content style="margin: 0 16px">
                <div :style="{ padding: '24px', background: '#fff', height: '100%',marginTop:'15px'
                     }"
                     class="flex flex-column page-container">

                    <!-- Bill is a cat. -->
                    <router-view></router-view>
                </div>
            </a-layout-content>
            <a-layout-footer style="text-align: center">
                Ant Design ©2022 Created by Ant DALONG
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script setup>
import { PieChartOutlined, DesktopOutlined, UserOutlined, TeamOutlined, FileOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, computed } from 'vue';
import pHeader from "components/header/header.vue";
import router from "@/router";
import { commonUtil } from "@/utils/store";
const collapsed = ref(false);
const selectedKeys = ref(commonUtil.pageKeys);


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

