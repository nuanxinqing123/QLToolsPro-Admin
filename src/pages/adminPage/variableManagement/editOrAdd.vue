<!--
 * @Descripttion: 修改
 * @Author: LiLei
 * @Date: 2022-08-22 16:44:50
 * @LastEditors: LiLei
 * @LastEditTime: 2022-12-17 16:54:56
-->
<template>
    <p-center-modal :modalVisible="visible"
                    :isFooter="false"
                    @close="close"
                    :title="dataObj.title">
        <template #content>
            <a-form ref="formRef"
                    class="form-ref"
                    name="custom-validation"
                    :model="formState"
                    :rules="rules"
                    v-bind="layout"
                    @validate="handleValidate"
                    @finishFailed="handleFinishFailed"
                    @finish="handleFinish">
                <a-form-item label="变量名"
                             name="env_name">
                    <a-input v-model:value="formState.env_name"
                             placeholder="请输入变量名" />
                </a-form-item>

                <a-form-item label="环境变量名称备注"
                             name="env_remarks">
                    <a-input v-model:value="formState.env_remarks"
                             placeholder="请输入环境变量名称备注" />
                </a-form-item>
                <a-form-item label="环境变量数量上限"
                             name="env_quantity">
                    <a-input-number v-model:value="formState.env_quantity"
                                    placeholder="请输入环境变量数量上限"
                                    style="width：100%;"
                                    min="0" />
                </a-form-item>
                <a-form-item label="环境变量匹配正则"
                             name="env_regex">
                    <a-input v-model:value="formState.env_regex"
                             placeholder="请输入环境变量匹配正则" />
                </a-form-item>
                <a-form-item label="环境变量模式"
                             name="env_mode">
                    <a-radio-group v-model:value="formState.env_mode">
                        <a-radio value="1"
                                 name="type">新建模式</a-radio>
                        <a-radio value="2"
                                 name="type">更新模式</a-radio>
                        <a-radio value="3"
                                 name="type">
                            <a-tooltip placement="top">
                                <template #title>
                                    <span>合并模式下VIP提交不支持会员到期后自动删除变量</span>
                                </template>
                                合并模式<span style="color:red;"> ？</span>
                            </a-tooltip>
                        </a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="环境变量分隔符"
                             v-if="formState.env_mode==3"
                             name="env_merge">
                    <a-input v-model:value="formState.env_merge"
                             placeholder="请输入环境变量分隔符" />
                </a-form-item>
                <a-form-item label="环境变量更新匹配正则"
                             v-else
                             name="env_update">
                    <a-input v-model:value="formState.env_update"
                             placeholder="请输入环境变量更新匹配正则" />
                </a-form-item>
                <a-form-item label="环境变量是否使用插件"
                             name="env_is_plugin">
                    <a-switch v-model:checked="formState.env_is_plugin"
                              checked-children="是"
                              un-checked-children="否" />
                </a-form-item>

                <!-- <a-form-item label="绑定的插件名称"
                             name="env_plugin_name">
                    <a-input v-model:value="formState.env_plugin_name"
                             placeholder="请输入绑定的插件名称" />
                </a-form-item> -->
                <a-form-item label="绑定的插件名称"
                             v-if="formState.env_is_plugin"
                             name="env_plugin_name">
                    <a-select v-model:value="formState.env_plugin_name"
                              placeholder="请选择"
                              :filter-option="filterOption"
                              show-search
                              option-label-prop="label"
                              :options="envPluginData">
                    </a-select>
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
                                    placeholder="请输入环境变量积分提交需要多少积分"
                                    min="0" />
                </a-form-item>
                <a-form-item label="变量提示内容"
                             name="env_tips">
                    <div style="border: 1px solid #ccc">
                        <Toolbar style="border-bottom: 1px solid #ccc"
                                 :editor="editorRef"
                                 :defaultConfig="toolbarConfig"
                                 :mode="mode" />
                        <Editor style="height: 300px; overflow-y: hidden;"
                                v-model="formState.env_tips"
                                :defaultConfig="editorConfig"
                                :mode="mode"
                                @onCreated="handleCreated" />
                    </div>
                    <!-- {{formState.notice}} -->
                </a-form-item>
                <div class="form-bottom">

                    <a-divider />

                    <a-form-item :wrapper-col="{ span: 9, offset: 12 }"
                                 class="timed-start-button">
                        <a-button @click="close">取消</a-button>
                        <a-button type="primary"
                                  style="margin-left: 20px"
                                  html-type="submit">提交</a-button>
                    </a-form-item>
                </div>

            </a-form>
        </template>
    </p-center-modal>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

import pCenterModal from "@/components/p-center-modal/p-center-modal.vue";

import { ref, reactive, toRefs, watch, shallowRef, onBeforeUnmount } from 'vue';
const props = defineProps({
    dataObj: Object,
    visible: Boolean,
});
import { message } from "ant-design-vue";
import dayjs from 'dayjs';

import {
    plugInManagementList,
    variableManagementAdd,
    variableManagementUpdate
} from "@/utils/api";

import {
    numberToString,
    stringToNumber,
} from "@/utils/common";
const {
    visible,
    dataObj
} = toRefs(props);
const formHeight = ref(0);
const emit = defineEmits(['update:visible', 'updateData']);
const close = () => {
    emit('update:visible', false);
}
const formState = reactive({
    "env_merge": "",
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
const envPluginData = ref([]);
const filterOption = (value, option) => {
    return option.label.indexOf(value) >= 0;
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

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

const toolbarConfig = {
    excludeKeys: [
        "group-video",
        "group-image",
        'headerSelect',
        'italic',
        'group-more-style' // 排除菜单组，写菜单组 key 的值即可
    ]
}
const editorConfig = { placeholder: '请输入变量提示内容...' }


const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleFinish = values => {
    if (formState.env_mode != 3) {
        formState.env_merge = '';
    }
    if (!formState.env_is_plugin) {
        formState.env_plugin_name = '';
    }

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
    postData.env_mode = stringToNumber(postData.env_mode);
    postData.env_is_charging = stringToNumber(postData.env_is_charging);
    postData.env_need_integral = stringToNumber(postData.env_need_integral);
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
// 获取变量名称下拉数据
const getData = () => {
    plugInManagementList({
        splicingData: {
            type: "ordinary"
        }
    }).then((data) => {
        envPluginData.value = (data || []).map(item => {
            item.label = item.plugin_name;
            item.value = item.file_name;
            return item;
        })
    })
}
// 初始化数据
const init = () => {
    // form高度
    formHeight.value = document.body.clientHeight * 0.8;
    getData();
    if (dataObj.value.ID) {
        formState.env_tips = dataObj.value.EnvTips || ''; //变量名提示
        formState.env_merge = dataObj.value.EnvMerge || dataObj.value.env_merge || ''; //变量名
        formState.env_name = dataObj.value.EnvName; //变量名
        formState.env_remarks = dataObj.value.EnvRemarks;  //环境变量名称备注
        formState.env_quantity = dataObj.value.EnvQuantity; //环境变量数量上限
        formState.env_regex = dataObj.value.EnvRegex;  //环境变量匹配正则
        formState.env_mode = numberToString(dataObj.value.EnvMode);  //环境变量模式[1：新建模式、2：更新模式]
        formState.env_update = dataObj.value.EnvUpdate;  //环境变量更新匹配正则（更新模式）
        formState.env_is_plugin = dataObj.value.EnvIsPlugin;  //环境变量是否使用插件
        formState.env_plugin_name = dataObj.value.EnvPluginName; //绑定的插件名称
        formState.env_is_charging = numberToString(dataObj.value.EnvIsCharging);  //环境变量是否计费（1：不计费、2：VIP提交、3：积分提交）
        formState.env_need_integral = numberToString(dataObj.value.EnvNeedIntegral); //环境变量积分提交需要多少积分
    } else {
        formState.env_tips = "";
        formState.env_merge = "";
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
.form-ref {
    // border: 1px solid red;
    padding-bottom: 70px;
    // position: relative;
    .form-bottom {
        width: 100%;
        padding-bottom: 20px;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 999;
    }
}
</style>
