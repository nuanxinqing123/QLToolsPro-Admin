<!--
 * @Descripttion: 编辑或新增
 * @Author: LiLei
 * @Date: 2022-08-22 16:44:50
 * @LastEditors: LiLei
 * @LastEditTime: 2022-09-29 16:33:18
-->
<template>
    <p-center-modal :modalVisible="visible"
                    :isFooter="false"
                    @close="close"
                    :title="dataObj.title">
        <template #content>
            <a-form ref="formRef"
                    name="custom-validation"
                    :model="formState"
                    :rules="rules"
                    v-bind="layout"
                    @validate="handleValidate"
                    @finishFailed="handleFinishFailed"
                    @finish="handleFinish">
                <a-form-item label="面板名称"
                             name="name">
                    <a-input v-model:value="formState.name" />
                </a-form-item>
                <a-form-item label="面板连接地址"
                             name="url">
                    <a-input v-model:value="formState.url" />
                </a-form-item>
                <a-form-item label="面板Client_Secret"
                             name="client_secret">
                    <a-input v-model:value="formState.client_secret" />
                </a-form-item>
                <a-form-item label="是否启用"
                             name="panel_enable">
                    <a-switch v-model:checked="formState.panel_enable"
                              checked-children="是"
                              un-checked-children="否" />
                </a-form-item>
                <a-form-item label="版本"
                             name="panel_version">
                    <a-switch v-model:checked="formState.panel_version"
                              checked-children="旧"
                              un-checked-children="新" />
                </a-form-item>
                <a-divider />

                <a-form-item :wrapper-col="{ span: 12, offset: 12 }"
                             class="timed-start-button">
                    <a-button @click="close">取消</a-button>
                    <a-button type="primary"
                              style="margin-left: 20px"
                              html-type="submit">提交</a-button>
                </a-form-item>
            </a-form>
        </template>
    </p-center-modal>
</template>

<script setup>
import pCenterModal from "@/components/p-center-modal/p-center-modal.vue";

import { ref, reactive, toRefs, watch } from 'vue';
const props = defineProps({
    dataObj: Object,
    visible: Boolean,
});
import { message } from "ant-design-vue";
import dayjs from 'dayjs';
import {
    panelManagementAdd,
    panelManagementUpdate,
} from "@/utils/api";
const {
    visible,
    dataObj
} = toRefs(props);
const emit = defineEmits(['update:visible', 'updateData']);
const close = () => {
    emit('update:visible', false);
}
const formState = reactive({
    "name": "",
    "url": "",
    "client_id": "",
    "client_secret": "",
    "panel_enable": true,
    "panel_version": false
});
const rules = {
    name: [{
        required: true,
        trigger: 'change',
    }],
    url: [{
        required: true,
        trigger: 'change',
    }],
    client_id: [{
        required: true,
        trigger: 'change',
    }],
    client_secret: [{
        required: true,
        trigger: 'change',
    }],
};

const handleFinishFailed = errors => {
    console.log(errors);

};

const handleValidate = (...args) => {
    console.log(args);
};
const layout = {
    labelCol: {
        span: 7,
    },
    wrapperCol: {
        span: 15,
    },
};

const handleFinish = values => {
    const postData = {
        ...formState
    }
    let postFuc = null;
    // 编辑
    if (dataObj.value.ID) {
        postData.id = dataObj.value.ID;
        postFuc = panelManagementUpdate;
    } else {
        // 新增
        postFuc = panelManagementAdd;

    }
    postFuc({
        data: postData
    }).then(() => {
        message.success('操作成功');
        emit("updateData", postData);
        close();
    })
};
// 定义 watch 监听
watch(
    visible,
    (newCount, old, clear) => {
        // 如果 watch 监听被重复执行了，则会先清除上次未完成的异步任务
        if (visible.value) {
            init();
        }
    }
    // watch 刚被创建的时候不执行
    // { lazy: true }
);

// 初始化数据
const init = () => {
    if (dataObj.value.title === '面板编辑') {
        formState.name = dataObj.value.PanelName;
        formState.url = dataObj.value.PanelURL;
        formState.client_id = dataObj.value.PanelClientID;
        formState.client_secret = dataObj.value.PanelClientSecret;
        formState.panel_enable = dataObj.value.PanelEnable;
        formState.panel_version = dataObj.value.PanelVersion;
        // formState.id = dataObj.value.ID;
    } else {
        formState.name = '';
        formState.url = '';
        formState.client_id = '';
        formState.client_secret = '';
        formState.panel_enable = '';
        formState.panel_version = '';
    }
}
</script>

<style lang="scss">
.timed-start-button {
    margin-bottom: 0;
    text-align: right;
}
</style>
