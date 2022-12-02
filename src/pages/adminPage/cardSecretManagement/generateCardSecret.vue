<!--
 * @Descripttion: 生成卡密
 * @Author: LiLei
 * @Date: 2022-08-22 16:44:50
 * @LastEditors: LiLei
 * @LastEditTime: 2022-12-02 19:43:53
-->
<template>
    <p-center-modal :modalVisible="visible"
                    :isFooter="false"
                    @close="close"
                    title="生成卡密">
        <template #content>
            <!-- {{ formState.cd_key_validity_period }} -->
            <a-form ref="formRef"
                    name="custom-validation"
                    :model="formState"
                    :rules="rules"
                    v-bind="layout"
                    @validate="handleValidate"
                    @finishFailed="handleFinishFailed"
                    @finish="handleFinish">
                <a-form-item label="生成数量"
                             name="cd_key_count">
                    <a-input-number v-model:value="formState.cd_key_count"
                                    style="width：100%;"
                                    min="0" />
                </a-form-item>
                <a-form-item label="卡密类型"
                             name="cd_key_type">
                    <a-radio-group v-model:value="formState.cd_key_type"
                                   @change="typeChange">
                        <a-radio value="integral"
                                 name="type">积分</a-radio>
                        <a-radio value="vip"
                                 name="type">会员</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="卡密积分"
                             v-if="formState.cd_key_type=='integral'"
                             name="cd_key_integral">
                    <a-input-number v-model:value="formState.cd_key_integral"
                                    placeholder="请输入卡密积分"
                                    style="width：100%;"
                                    min="0" />
                </a-form-item>
                <!-- <a-form-item label="卡密有效期"
                             v-if="formState.cd_key_type=='vip'"
                             name="cd_key_validity_period">
                    <a-radio-group v-model:value="formState.cd_key_validity_period">
                        <a-radio :value="1"
                                 name="type">天卡</a-radio>
                        <a-radio :value="7"
                                 name="type">周卡</a-radio>
                        <a-radio :value="14"
                                 name="type">两周卡</a-radio>
                        <a-radio :value="31"
                                 name="type">月卡</a-radio>

                        <a-radio :value="92"
                                 name="type">季度</a-radio>
                        <a-radio :value="183"
                                 name="type">半年</a-radio>
                        <a-radio :value="365"
                                 name="type">一年</a-radio>
                    </a-radio-group>

                </a-form-item> -->
                <a-form-item name="cd_key_validity_period"
                             label="卡密有效期"
                             v-if="formState.cd_key_type=='vip'">
                    <a-input-number v-model:value="formState.cd_key_validity_period"
                                    placeholder="请输入CD-KEY有效期"
                                    style="width：100%;"
                                    min="0" />

                </a-form-item>
                <a-form-item label="卡密前缀"
                             name="cd_key_prefix">
                    <a-input v-model:value="formState.cd_key_prefix" />
                </a-form-item>
                <a-form-item label="卡密标识"
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

import { ref, reactive, toRefs, watch, computed } from 'vue';
const props = defineProps({
    dataObj: Object,
    visible: Boolean,
});
import { message } from "ant-design-vue";
import dayjs from 'dayjs';
import {
    cardSecretManagementAddDownload,
    cardSecretManagementAdd
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
    "cd_key_count": 1,
    "cd_key_type": "integral",
    "cd_key_integral": undefined,
    "cd_key_validity_period": "",
    "cd_key_prefix": "",
    "cd_key_remarks": ""
});
const rules = computed(() => {
    return {

        cd_key_integral: [{
            required: formState.cd_key_type == 'integral',
            trigger: 'change',
            message: "请输入卡密积分"
        }],
        cd_key_validity_period: [{
            required: formState.cd_key_type != 'integral',
            trigger: 'change',
            message: "请选择卡密有效期"
        }],
        cd_key_count: [{
            required: true,
            trigger: 'change',
        }],
        cd_key_type: [{
            required: true,
            trigger: 'change',
        }],
    }
})
const typeChange = () => {
    if (formState.cd_key_type == 'integral') {
        formState.cd_key_validity_period = 0;
        formState.cd_key_integral = "";
    } else {
        formState.cd_key_integral = 0;
        formState.cd_key_validity_period = "";
    }
}

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
    cardSecretManagementAdd({
        data: postData
    }).then(() => {
        message.success('操作成功');
        cardSecretManagementAddDownload();
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
    formState.cd_key_count = 1;
    formState.cd_key_type = "integral";
    formState.cd_key_integral = undefined;
    formState.cd_key_validity_period = 0;
    formState.cd_key_prefix = "";
    formState.cd_key_remarks = "";
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
