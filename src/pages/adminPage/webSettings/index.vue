<!--
 * @Descripttion: 网站设置
 * @Author: LiLei
 * @Date: 2022-08-16 02:37:06
 * @LastEditors: LiLei
 * @LastEditTime: 2022-10-06 16:23:47
-->

<template>
    <page-container @initData="getData"
                    isScroll>
        <template #top="{height}">
            <a-form :model="formState"
                    name="basic"
                    :rules="rules"
                    v-bind="formItemLayout"
                    autocomplete="off"
                    @finish="onFinish"
                    class="flex flex-column page-form"
                    :style="{height:height - 48 + 'px'}"
                    @finishFailed="onFinishFailed">
                <div class="flex-base overflow-scroll">

                    <a-form-item label="网站标题"
                                 name="web_title"
                                 has-feedback>
                        <a-input v-model:value="formState.web_title"
                                 placeholder="请输入网站标题">
                        </a-input>
                    </a-form-item>
                    <a-form-item label="网站图标"
                                 name="web_ico"
                                 has-feedback>
                        <a-textarea v-model:value="formState.web_ico"
                                    placeholder="请输入网站图标">
                        </a-textarea>
                    </a-form-item>
                    <a-form-item label="网站LOGO"
                                 name="web_logo"
                                 has-feedback>
                        <a-textarea v-model:value="formState.web_logo"
                                    placeholder="请输入网站LOGO">
                        </a-textarea>
                    </a-form-item>
                    <a-form-item label="网站背景"
                                 name="web_bg"
                                 has-feedback>
                        <a-textarea v-model:value="formState.web_bg"
                                    placeholder="请输入网站背景">
                        </a-textarea>
                    </a-form-item>
                    <a-form-item label="注册开关"
                                 name="register">
                        <a-radio-group v-model:value="formState.register">
                            <a-radio value="1"
                                     name="type">打开</a-radio>
                            <a-radio value="2"
                                     name="type">关闭</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item label="网站介绍"
                                 name="notice">
                        <div style="border: 1px solid #ccc">
                            <Toolbar style="border-bottom: 1px solid #ccc"
                                     :editor="editorRef"
                                     :defaultConfig="toolbarConfig"
                                     :mode="mode" />
                            <Editor style="height: 300px; overflow-y: hidden;"
                                    v-model="formState.notice"
                                    :defaultConfig="editorConfig"
                                    :mode="mode"
                                    @onCreated="handleCreated" />
                        </div>
                        <!-- {{formState.notice}} -->
                    </a-form-item>
                </div>

                <a-form-item :wrapper-col="{ offset: 3, span: 16 }">
                    <a-button type="primary"
                              style="width:100%;"
                              html-type="submit">提交</a-button>
                </a-form-item>
            </a-form>
        </template>
    </page-container>
</template>
<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted, reactive, computed } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import pageContainer from "@/components/page-container/page-container.vue";

import {
    webSettingsSms,
    webSettingsUpdate,
} from "utils/api.js";
import {
    commonUtil
} from '@/utils/store';
import { message } from "ant-design-vue";
const setType = (t) => {
    formState.type = t;
}
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
const editorConfig = { placeholder: '请输入公告内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}

const formState = reactive({
    web_title: "",
    web_ico: "",
    web_logo: "",
    web_bg: "",
    register: "1",
    notice: "",
});
const rules = computed(() => {
    return {
        web_title: [{
            required: false,
            trigger: 'change',
        }],
        web_ico: [{
            required: false,
            trigger: 'change',
        }],
        web_logo: [{
            required: false,
            trigger: 'change',
        }],
        web_bg: [{
            required: false,
            trigger: 'change',
        }],
        register: [{
            required: false,
            trigger: 'change',
        }],
        notice: [{
            required: false,
            trigger: 'change',
        }],
    }
});
const formItemLayout = {
    labelCol: {
        span: 3,
    },
    wrapperCol: {
        span: 16,
    },
};
const onFinish = values => {
    console.log('Success:', values);
    webSettingsUpdate({
        data:
            [
                { "key": "web_title", "value": formState.web_title },
                { "key": "web_ico", "value": formState.web_ico },
                { "key": "web_logo", "value": formState.web_logo },
                { "key": "web_bg", "value": formState.web_bg },
                { "key": "register", "value": formState.register },
                { "key": "notice", "value": formState.notice }
            ]
    }).then(() => {
        commonUtil.getWebSetting()
        message.success('设置成功');
    })
};

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};
// 获取数据
const getData = () => {
    commonUtil.getWebSetting().then((data) => {
        formState.web_title = data.web_title || '';
        formState.web_ico = data.web_ico || '';
        formState.web_logo = data.web_logo || '';
        formState.register = data.register || '';
        formState.web_bg = data.web_bg || '';
        formState.notice = data.notice || '';
        // formState.web_title = data.filter(item => item.key == 'web_title')[0].value || '';
        // formState.web_ico = data.filter(item => item.key == 'web_ico')[0].value || '';
        // formState.web_logo = data.filter(item => item.key == 'web_logo')[0].value || '';
        // formState.register = data.filter(item => item.key == 'register')[0].value || '';
        // formState.notice = data.filter(item => item.key == 'register')[0].notice || '';
    })
}

</script>

<style lang="scss">
.page-sets {
    width: 100%;
    padding: 0 15px;
    background-color: #fff;
    .page-form {
        height: 100%;
    }
}
</style>
