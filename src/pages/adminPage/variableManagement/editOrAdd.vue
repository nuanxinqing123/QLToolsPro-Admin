<!--
 * @Descripttion: 修改
 * @Author: LiLei
 * @Date: 2022-08-22 16:44:50
 * @LastEditors: LiLei
 * @LastEditTime: 2022-09-29 21:26:44
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
                <a-form-item label="变量名"
                             name="env_name">
                    <a-input v-model:value="formState.env_name" />
                </a-form-item>

                <a-form-item label="环境变量名称备注"
                             name="env_remarks">
                    <a-input v-model:value="formState.env_remarks" />
                </a-form-item>
                <a-form-item label="环境变量数量上限"
                             name="env_quantity">
                    <a-input-number v-model:value="formState.env_quantity"
                                    style="width：100%;"
                                    min="0" />
                </a-form-item>
                <a-form-item label="环境变量匹配正则"
                             name="env_regex">
                    <a-input v-model:value="formState.env_regex" />
                </a-form-item>
                <a-form-item label="环境变量模式"
                             name="env_mode">
                    <a-radio-group v-model:value="formState.env_mode">
                        <a-radio value="1"
                                 name="type">新建模式</a-radio>
                        <a-radio value="2"
                                 name="type">更新模式</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="环境变量更新匹配正则"
                             name="env_update">
                    <a-input v-model:value="formState.env_update" />
                </a-form-item>
                <a-form-item label="环境变量是否使用插件"
                             name="env_is_plugin">
                    <a-switch v-model:checked="formState.env_is_plugin"
                              checked-children="是"
                              un-checked-children="否" />
                </a-form-item>

                <a-form-item label="绑定的插件名称"
                             name="env_plugin_name">
                    <a-input v-model:value="formState.env_plugin_name" />
                </a-form-item>
                <a-form-item label="环境变量是否计费"
                             name="env_is_charging">
                    <a-radio-group v-model:value="formState.env_is_charging">
                        <a-radio value="1"
                                 name="type">不计费</a-radio>
                        <a-radio value="2"
                                 name="type">VIP提交</a-radio>
                        <a-radio value="3"
                                 name="type">积分提交</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="环境变量积分提交需要多少积分"
                             name="env_need_integral">
                    <a-input-number v-model:value="formState.env_need_integral"
                                    style="width：100%;"
                                    min="0" />
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
    variableManagementAdd,
    variableManagementUpdate
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
    "env_name": "", //变量名
    "env_remarks": "", //环境变量名称备注
    "env_quantity": "", //环境变量数量上限
    "env_regex": "", //环境变量匹配正则
    "env_mode": '1', //环境变量模式[1：新建模式、2：更新模式]
    "env_update": "", //环境变量更新匹配正则（更新模式）
    "env_is_plugin": false, //环境变量是否使用插件
    "env_plugin_name": "", //绑定的插件名称
    "env_is_charging": '1', //环境变量是否计费（1：不计费、2：VIP提交、3：积分提交）
    "env_need_integral": "" //环境变量积分提交需要多少积分
});
const rules = {
    env_name: [{
        required: true,
        trigger: 'change',
    }],
    env_quantity: [{
        required: true,
        trigger: 'change',
    }],
    env_mode: [{
        required: true,
        trigger: 'change',
    }],
    env_is_plugin: [{
        required: true,
        trigger: 'change',
    }],
    env_is_charging: [{
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
        ...formState
    }
    let postFuc = null;
    // 编辑
    if (dataObj.value.ID) {
        postData.id = dataObj.value.ID;
        postFuc = variableManagementUpdate;
    } else {
        // 新增
        postFuc = variableManagementAdd;
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

        formState.env_name = dataObj.value.EnvName; //变量名
        formState.env_remarks = dataObj.value.EnvRemarks;  //环境变量名称备注
        formState.env_quantity = dataObj.value.EnvQuantity; //环境变量数量上限
        formState.env_regex = dataObj.value.EnvRegex;  //环境变量匹配正则
        formState.env_mode = dataObj.value.EnvMode;  //环境变量模式[1：新建模式、2：更新模式]
        formState.env_update = dataObj.value.EnvUpdate;  //环境变量更新匹配正则（更新模式）
        formState.env_is_plugin = dataObj.value.EnvIsPlugin;  //环境变量是否使用插件
        formState.env_plugin_name = dataObj.value.EnvPluginName; //绑定的插件名称
        formState.env_is_charging = dataObj.value.EnvIsCharging;  //环境变量是否计费（1：不计费、2：VIP提交、3：积分提交）
        formState.env_need_integral = dataObj.value.EnvNeedIntegral; //环境变量积分提交需要多少积分
    } else {
        formState.env_name = ""; //变量名
        formState.env_remarks = "";  //环境变量名称备注
        formState.env_quantity = ""; //环境变量数量上限
        formState.env_regex = "";  //环境变量匹配正则
        formState.env_mode = '1';  //环境变量模式[1：新建模式、2：更新模式]
        formState.env_update = "";  //环境变量更新匹配正则（更新模式）
        formState.env_is_plugin = false;  //环境变量是否使用插件
        formState.env_plugin_name = ""; //绑定的插件名称
        formState.env_is_charging = '1';  //环境变量是否计费（1：不计费、2：VIP提交、3：积分提交）
        formState.env_need_integral = ""; //环境变量积分提交需要多少积分
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
