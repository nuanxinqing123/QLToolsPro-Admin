<!--
 * @Descripttion: 备份恢复
 * @Author: LiLei
 * @Date: 2022-08-22 16:44:50
 * @LastEditors: LiLei
 * @LastEditTime: 2022-10-06 20:06:03
-->
<template>
    <p-center-modal :modalVisible="visible"
                    :isFooter="false"
                    @close="close"
                    title="备份恢复">
        <template #content>
            <a-form ref="formRef"
                    name="custom-validation"
                    :model="formState"
                    :rules="rules"
                    v-bind="layout"
                    @validate="handleValidate"
                    @finishFailed="handleFinishFailed"
                    @finish="handleFinish">

                <a-form-item label="恢复文件"
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
    containerManagementRestore,
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
    "file": []
});
const rules = {
    file: [{
        required: true,
        trigger: 'change',
        message: "请上传恢复文件"
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
        id: dataObj.value.start
    }
    containerManagementRestore({
        splicingData: splicingData,
        data: postData
    }).then(() => {
        message.success('操作成功');
        emit("updateData");
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
