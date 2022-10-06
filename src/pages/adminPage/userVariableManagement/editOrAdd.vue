<!--
 * @Descripttion: 修改
 * @Author: LiLei
 * @Date: 2022-08-22 16:44:50
 * @LastEditors: LiLei
 * @LastEditTime: 2022-10-06 10:42:12
-->
<template>
    <p-center-modal :modalVisible="visible"
                    :isFooter="false"
                    @close="close"
                    title="变量修改">
        <template #content>
            <a-form ref="formRef"
                    name="custom-validation"
                    :model="formState"
                    :rules="rules"
                    v-bind="layout"
                    @validate="handleValidate"
                    @finishFailed="handleFinishFailed"
                    @finish="handleFinish">
                <a-form-item label="变量值"
                             name="value">
                    <a-input v-model:value="formState.value" />
                </a-form-item>
                <a-form-item label="变量备注"
                             name="remarks">
                    <a-input v-model:value="formState.remarks" />
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
    userVariableManagementUpdate,
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
    "remarks": "",
    "value": "",
});
const rules = {
    value: [{
        required: true,
        trigger: 'change',
    }],
    remarks: [{
        required: true,
        trigger: 'change',
    }]
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
        ...formState,
        "panel_name": dataObj.value.panel_name, //面板名称
        "id": dataObj.value.id, //青龙面板的环境变量 id
        "_id": dataObj.value._id, //青龙面板的环境变量 _id
        "name": dataObj.value.name,
    }
    userVariableManagementUpdate({
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
    const formState = reactive({
        "remarks": "",
        "value": "",
    });
    formState.remarks = dataObj.value.remarks || '';
    formState.value = dataObj.value.value || '';
}
</script>

<style lang="scss">
.timed-start-button {
    margin-bottom: 0;
    text-align: right;
}
</style>
