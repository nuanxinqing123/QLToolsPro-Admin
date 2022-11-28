<!--
 * @Descripttion: 异常登录
 * @Author: LiLei
 * @Date: 2022-08-22 16:44:50
 * @LastEditors: LiLei
 * @LastEditTime: 2022-11-28 09:45:53
-->
<template>
    <p-center-modal :modalVisible="visible"
                    isNoBg
                    isWidth80
                    :isFooter="false"
                    @close="close"
                    title="您的登录环境异常，需要校验身份">
        <template #content>
            <a-form :model="formState"
                    :rules="rules"
                    @finish="handleFinish"
                    @finishFailed="handleFinishFailed">

                <a-form-item name="username">
                    <a-input v-model:value="formState.username"
                             placeholder="请输入用户名"
                             :bordered="false"
                             allow-clear>
                        <template #prefix>
                            <UserOutlined style="fontSize: 20px;color: rgba(0, 0, 0, 0.25)" />
                        </template>
                    </a-input>
                </a-form-item>

                <a-form-item name="id">
                    <a-input v-model:value="formState.id"
                             placeholder="输入验证码"
                             :bordered="false"
                             allow-clear>
                        <template #prefix>
                            <MessageOutlined style="fontSize: 20px;color: rgba(0, 0, 0, 0.25)" />
                        </template>
                        <template #suffix>
                            <a-button class="button-flex post-code align-center"
                                      disabled
                                      v-if="isDeadline">
                                重发验证码
                                <!-- （ -->
                                <a-statistic-countdown :value="deadline"
                                                       format="ss"
                                                       @finish="codeFinish" />
                                <!-- ） -->
                            </a-button>

                            <template v-else>
                                <a-button type="primary"
                                          class="button-flex post-code align-center"
                                          @click="abnormalOpenCode">
                                    发送验证码</a-button>
                            </template>

                        </template>
                    </a-input>
                </a-form-item>

                <a-form-item name="password">
                    <a-input-password v-model:value="formState.password"
                                      type="password"
                                      placeholder="请输入密码"
                                      :bordered="false"
                                      allow-clear>
                        <template #prefix>
                            <LockOutlined style="fontSize: 20px;color: rgba(0, 0, 0, 0.25)" />
                        </template>
                    </a-input-password>
                </a-form-item>

                <a-form-item align="middle">
                    <a-button type="primary"
                              style="width:100%;"
                              html-type="submit"
                              :class="['login-button', loginCheck ? 'disabled' : '']"
                              :disabled="loginCheck">
                        登录
                    </a-button>

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
import {
    MailOutlined,
    UserOutlined,
    LockOutlined,
    MessageOutlined,
    SolutionOutlined
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import dayjs from 'dayjs';
import {
    abnormalSignin,
    abnormalCode,
} from "@/utils/api";
const {
    visible,
    dataObj
} = toRefs(props);

const emit = defineEmits(['update:visible', 'updateData']);
const close = () => {
    emit('update:visible', false);
}
// 获取登录校验
const loginCheck = computed(() => {
    return !formState.username || !formState.password;
})
// 倒计时回调成功
const codeFinish = () => {
    deadline.value = Date.now();
    isDeadline.value = false;
};
const formState = reactive({
    "username": "",
    "password": "",
    "id": ""
});
import {
    commonUtil
} from '@/utils/store';
// 是否开启倒计时
const isDeadline = ref(false);
const deadline = ref(Date.now() + 1000 * 60);
// 开启异常倒计时

const abnormalOpenCode = () => {
    if (!formState.username) {
        message.error('请输入用户名');
        return;
    }

    abnormalCode({
        data: {
            "username": formState.username
        }
    }).then(() => {
        message.success('发送成功，请前往微信公众号【WxPusher】查看验证码');
        deadline.value = Date.now() + 1000 * 60;
        isDeadline.value = true;
    });
}
const rules = {
    username: {
        required: true,
        message: '请输入用户名!'
    },
    password: {
        required: true,
        message: '请输入密码!'
    },
    id: {
        required: true,
        message: '请输入验证码!'
    },

};

const handleRemove = file => {
    formState.file = [];
};
const beforeUpload = file => {
    formState.file = [file];
    // console.log("file", file)
    // formState.file = file;
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

    // 登录
    let postData = {
        "username": formState.username,
        "password": formState.password,
        "id": formState.id,
    }

    abnormalSignin({
        data: postData
    }).then(data => {
        // 保存token
        commonUtil.saveItem("token", data);
        message.success('登录成功');
        commonUtil.getUserSmsInfo();
    }).catch((e) => {
        // console.log("eeee", e);
        try {
            // 登录环境异常
            if (e.code == 5017) {
                // 异常登录弹窗
                abnormalOpenCode();
                return;
            }
        } catch (error) {
            // message.error(e.msg || '系统异常')
        }
        // message.error(e.msg || '系统异常')
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
    formState.username = dataObj.value.username || '';
    formState.password = dataObj.value.password || '';
    formState.id = '';
    abnormalOpenCode();
}
</script>

<style lang="scss">
.button-flex {
    display: flex;
}
@media screen and (max-width: 750px) {
    .post-code {
        font-size: 14px;
        line-height: 30px;
        padding: 0 5px;
        .ant-statistic {
            font-size: 14px;
            line-height: 30px;
            margin-top: -2px;
            margin-left: 5px;
            span {
                display: inline-block;
                font-size: 14px;
            }
        }
    }
}
</style>
