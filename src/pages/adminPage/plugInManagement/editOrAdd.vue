<!--
 * @Descripttion: 修改
 * @Author: LiLei
 * @Date: 2022-08-22 16:44:50
 * @LastEditors: LiLei
 * @LastEditTime: 2022-09-30 10:21:13
-->
<template>
    <p-center-modal :modalVisible="visible"
                    :isFooter="false"
                    @close="close"
                    title="上传插件">
        <template #content>
            <a-form ref="formRef"
                    name="custom-validation"
                    :model="formState"
                    :rules="rules"
                    v-bind="layout"
                    @validate="handleValidate"
                    @finishFailed="handleFinishFailed"
                    @finish="handleFinish">
                <a-form-item label="类型:"
                             name="type">
                    <a-select v-model:value="formState.type"
                              placeholder="请选择"
                              style="width: 200px"
                              :options="options"></a-select>
                </a-form-item>

                <a-form-item label="插件"
                             name="file">
                    <a-upload v-model:fileList="formState.file"
                              :max-count="1"
                              :before-upload="beforeUpload">
                        <a-button>
                            <upload-outlined></upload-outlined>
                            上传
                        </a-button>
                    </a-upload>
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
import {
    UploadOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import dayjs from 'dayjs';
import {
    plugInManagementUpload,
} from "@/utils/api";
const {
    visible,
    dataObj
} = toRefs(props);
const options = ref([
    {
        value: "ordinary",
        label: "普通"
    },
    {
        value: "cron",
        label: "定时"
    }
])
const emit = defineEmits(['update:visible', 'updateData']);
const close = () => {
    emit('update:visible', false);
}
const formState = reactive({
    "type": "ordinary", //变量名
    "file": []
});
const rules = {
    type: [{
        required: true,
        trigger: 'change',
    }],
    file: [{
        required: true,
        trigger: 'change',
        message: "请上传插件"
    }],

};
const beforeUpload = file => {
    // fileList.value = [...fileList.value, file];
    return false;
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
        file: formState.file
    }
    let postFuc = null;
    // 编辑
    let splicingData = {
        type: formState.type
    }
    plugInManagementUpload({
        splicingData: splicingData,
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
    formState.type = "ordinary";
    formState.file = [];
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
