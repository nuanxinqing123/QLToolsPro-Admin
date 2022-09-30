<!--
 * @Descripttion: 修改
 * @Author: LiLei
 * @Date: 2022-08-22 16:44:50
 * @LastEditors: LiLei
 * @LastEditTime: 2022-09-30 09:26:50
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
                <a-form-item label="CD-KEY状态"
                             name="state">
                    <a-switch v-model:checked="formState.state"
                              checked-children="开启"
                              un-checked-children="关闭" />
                </a-form-item>

                <a-form-item label="CD-KEY标识"
                             name="cd_key_remarks">
                    <a-input v-model:value="formState.cd_key_remarks" />
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
    cardSecretManagementUpdate
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
    "state": false,
    "cd_key_remarks": ""
});
const rules = {
    state: [{
        required: true,
        trigger: 'change',
    }],
    cd_key_remarks: [{
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
        postFuc = cardSecretManagementUpdate;
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

    if (dataObj.value.ID) {

        formState.state = dataObj.value.CdKeyState;
        formState.cd_key_remarks = dataObj.value.CdKeyRemarks;

    } else {
        formState.state = false;
        formState.cd_key_remarks = '';
    }

}
</script>

<style lang="scss">
.timed-start-button {
    margin-bottom: 0;
    text-align: right;
}
.ant-input-number {
    width: 100%;
}
</style>
