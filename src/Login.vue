<template>
    <view class="page-login bg-cover flex align-items">
        <view class="login-container flex">
            <view class="container-left flex-base flex  flex-column align-items"
                  v-if="!isMobile">
                <view class="left-image bg-cover"></view>
                <view class="left-text font-weight">
                    青龙助手PRO
                    <text class="left-small">简洁、方便的助手</text>
                </view>
            </view>
            <view class="container-right">
                <view class="right-title flex align-items">欢迎登录</view>

                <a-form :model="formState"
                        :rules="rules"
                        @finish="handleFinish"
                        @finishFailed="handleFinishFailed">
                    <a-form-item label=""
                                 name="find_type"
                                 class="form-findtype"
                                 v-if="loginType === 'retrieve'">
                        <a-radio-group v-model:value="formState.find_type">
                            <a-radio value="email">邮箱找回</a-radio>
                            <a-radio value="user">用户名找回</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item name="email"
                                 v-if="loginType == 'register' || (loginType === 'retrieve' && formState.find_type==='email')">
                        <a-input v-model:value="formState.email"
                                 placeholder="请输入邮箱"
                                 :bordered="false"
                                 allow-clear>
                            <template #prefix>
                                <MailOutlined style="fontSize: 20px;color: rgba(0, 0, 0, 0.25)" />
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item name="username"
                                 v-if="loginType !== 'retrieve' || (loginType === 'retrieve' && formState.find_type==='user')">
                        <a-input v-model:value="formState.username"
                                 placeholder="请输入用户名"
                                 :bordered="false"
                                 allow-clear>
                            <template #prefix>
                                <UserOutlined style="fontSize: 20px;color: rgba(0, 0, 0, 0.25)" />
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item name="capt"
                                 v-if="loginType === 'retrieve'">
                        <a-input v-model:value="formState.capt"
                                 placeholder="请输入校验码"
                                 :bordered="false"
                                 allow-clear>
                            <template #prefix>
                                <MessageOutlined style="fontSize: 20px;color: rgba(0, 0, 0, 0.25)" />
                            </template>
                            <template #suffix>
                                <a-image :width="100"
                                         :preview="false"
                                         @click="getCheckCode"
                                         :src="checkCodeImage" />
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item name="code"
                                 v-if="loginType === 'retrieve'">
                        <a-input v-model:value="formState.code"
                                 placeholder="请输入验证码"
                                 :bordered="false"
                                 allow-clear>
                            <template #prefix>
                                <MessageOutlined style="fontSize: 20px;color: rgba(0, 0, 0, 0.25)" />
                            </template>
                            <template #suffix>
                                <a-button class="flex post-code align-center"
                                          disabled
                                          v-if="isDeadline">
                                    发送验证码（
                                    <a-statistic-countdown :value="deadline"
                                                           format="ss"
                                                           @finish="codeFinish" />
                                    ）
                                </a-button>
                                <a-button type="primary"
                                          class="flex post-code align-center"
                                          @click="openCode"
                                          v-else>
                                    发送验证码</a-button>
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item name="capt"
                                 v-if="loginType !== 'retrieve'">
                        <a-input v-model:value="formState.capt"
                                 placeholder="请输入验证码"
                                 :bordered="false"
                                 allow-clear>
                            <template #prefix>
                                <MessageOutlined style="fontSize: 20px;color: rgba(0, 0, 0, 0.25)" />
                            </template>
                            <template #suffix>
                                <a-image :width="100"
                                         :preview="false"
                                         @click="getCheckCode"
                                         :src="checkCodeImage" />
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
                    <a-form-item v-if="loginType === 'register'"
                                 name="re_password">
                        <a-input-password v-model:value="formState.re_password"
                                          placeholder="请输入确认密码"
                                          :bordered="false"
                                          allow-clear>
                            <template #prefix>
                                <LockOutlined style="fontSize: 20px;color: rgba(0, 0, 0, 0.25)" />
                            </template>
                        </a-input-password>
                    </a-form-item>
                    <view class="login-register"
                          v-if="loginType === 'login'">
                        <template v-if="commonUtil.siteSettings.register==1">
                            没有账号?
                            <text class="register-button"
                                  @click="setLoginType('register')">注册</text>
                        </template>

                        忘记密码?
                        <text class="register-button"
                              @click="setLoginType('retrieve')">找回</text>
                    </view>
                    <view class="login-register"
                          v-if="loginType === 'register'">
                        已有账号?
                        <text class="register-button"
                              @click="setLoginType('login')">登录</text>
                        忘记密码?
                        <text class="register-button"
                              @click="setLoginType('retrieve')">找回</text>
                    </view>
                    <view class="login-register"
                          v-if="loginType === 'retrieve'">
                        已有账号?
                        <text class="register-button"
                              @click="setLoginType('login')">登录</text>
                        <template v-if="commonUtil.siteSettings.register==1">
                            没有账号?
                            <text class="register-button"
                                  @click="setLoginType('register')">注册</text>
                        </template>
                    </view>
                    <a-form-item align="middle">
                        <a-button v-if="loginType === 'login'"
                                  type="primary"
                                  html-type="submit"
                                  :class="['login-button', loginCheck ? 'disabled' : '']"
                                  :disabled="loginCheck">
                            登录
                        </a-button>

                        <a-button v-if="loginType === 'register'"
                                  type="primary"
                                  html-type="submit"
                                  :class="['login-button', registerCheck ? 'disabled' : '']"
                                  :disabled="registerCheck">
                            注册
                        </a-button>
                        <a-button v-if="loginType === 'retrieve'"
                                  type="primary"
                                  html-type="submit"
                                  :class="['login-button', retrieveCheck ? 'disabled' : '']"
                                  :disabled="retrieveCheck">
                            找回
                        </a-button>
                    </a-form-item>
                </a-form>
            </view>
        </view>
    </view>
</template>

<script setup>
import {
    message
} from 'ant-design-vue';
import {
    userRepwd,
    userFindpwdCode,
    userSignin,
    userRegister,
    generateVerificationCode
} from "utils/api.js";
import {
    MailOutlined,
    UserOutlined,
    LockOutlined,
    MessageOutlined,
    SolutionOutlined
} from '@ant-design/icons-vue';


import {
    commonUtil
} from '@/utils/store';
import {
    computed,
    reactive,
    ref
} from 'vue';
import {
    storeToRefs
} from 'pinia';
// 生成响应式
const {
    isMobile,
} = storeToRefs(commonUtil);
// 获取登录校验
const loginCheck = computed(() => {
    return !formState.username || !formState.password;
})
// 获取注册校验
const registerCheck = computed(() => {
    return !formState.username || !formState.password || !formState.email || !formState.re_password || !formState.capt;
});
// 获取找回密码校验
const retrieveCheck = computed(() => {
    if (formState.find_type === 'user') {
        return !formState.find_type || !formState.code || !formState.capt || !formState.username;
    } else {
        return !formState.find_type || !formState.code || !formState.capt || !formState.email;
    }
})
let validatePass = async (_rule, value) => {
    if (value === '') {
        return Promise.reject('请输入确认密码!');
    } else if (value !== formState.password) {
        return Promise.reject("两次密码输入不一致!");
    } else {
        return Promise.resolve();
    }
};
const rules = {
    email: {
        required: true,
        type: 'email',
        message: '请输入邮箱!'
    },
    username: {
        required: true,
        message: '请输入用户名!'
    },
    password: {
        required: true,
        message: '请输入密码!'
    },
    capt: {
        required: true,
        message: '请输入!'
    },
    re_password: [{
        validator: validatePass,
        trigger: 'change',
    }],
};

const formState = reactive({
    "code": "",
    find_type: "email",
    content: "",
    "email": "",
    "username": "",
    "password": "",
    "re_password": "",
    "capt": "",
    "id": ""
});

// 是否开启倒计时
const isDeadline = ref(false);
const deadline = ref(Date.now() + 1000 * 60);
// 开启倒计时
const openCode = () => {
    if (formState.find_type === 'user' && !formState.username) {
        message.error('请输入用户名');
        return;
    }
    if (formState.find_type === 'email' && !formState.email) {
        message.error('请输入邮箱');
        return;
    }
    if (!formState.capt) {
        message.error('请输入校验码');
        return;
    }
    userFindpwdCode({
        data: {
            "find_type": formState.find_type,
            "content": formState.find_type === 'user' ? formState.username : formState.email,
            "capt": formState.capt,
            "id": formState.id,
        }
    }).then(() => {
        message.success('发送成功，请去微信WXPUSher进行查看');
        deadline.value = Date.now() + 1000 * 60;
        isDeadline.value = true;
    });
};
// 倒计时回调成功
const codeFinish = () => {
    deadline.value = Date.now();
    isDeadline.value = false;
};

const handleFinish = values => {
    switch (loginType.value) {
        case 'login':
            login();
            break;
        case 'register':
            register();
            break;
        default:
            retrieve();
            break;
    }

};
// 找回密码
const retrieve = () => {
    userRepwd({
        data: {
            "code": formState.code,
            "password": formState.password,
        }
    }).then((data) => {
        message.success("注册成功,请重新登录");
        loginType.value = "login";
        formState.capt = '';
        formState.code = '';
        getCheckCode();
    }).catch(() => {
        getCheckCode();
    })
}
// 注册
const register = () => {
    if (formState.password !== formState.re_password) {
        message.error("两次密码输入不一致");
        return;
    }
    userRegister({
        data: {
            "email": formState.email,
            "username": formState.username,
            "password": formState.password,
            "re_password": formState.re_password,
            "capt": formState.capt,
            "id": formState.id,
        }
    }).then((data) => {
        message.success("注册成功,请登录");
        formState.capt = '';
        loginType.value = "login";
        getCheckCode();
    }).catch(() => {
        getCheckCode();
    })
}
const handleFinishFailed = errors => {
    console.log(errors);
};
// 验证码图片
const checkCodeImage = ref('');


// 登录方式 login -登录   register -注册 retrieve -找回
const loginType = ref('login');
const setLoginType = text => {
    formState.email = '';
    formState.username = '';
    formState.password = '';
    formState.code = '';
    loginType.value = text;
};
// 登录
const login = () => {
    userSignin({
        data: {
            "username": formState.username,
            "password": formState.password,
            "capt": formState.capt,
            "id": formState.id,
        }
    }).then(data => {
        // 保存token
        commonUtil.saveItem("token", data);
        message.success('登录成功');
        commonUtil.getUserSmsInfo();
        /*if (loginType.value !== 'login') {
            setLoginType('login');
        } else {
            // 跳转页面
            // store.commit("setLeftWindow", false);
            uni.setLeftWindowStyle({
                display: 'block'
                // width: "200px"
            });
            uni.setTopWindowStyle({
                left: 'var(--window-left)'
            });
            store.commit('reLaunch', {
                name: 'home'
            });
        }*/
    }).catch(() => {
        getCheckCode();
    })
};


// 获取验证码
const getCheckCode = () => {
    generateVerificationCode().then((data) => {
        checkCodeImage.value = data.bs64;
        formState.id = data.id;
    })
}
getCheckCode();
</script>

<style lang="scss">
uni-left-window,
.uni-left-window {
    display: none !important;
}

.page-login {
    width: 100vw;
    height: 100vh;

    background-image: url("@/assets/img/bg.png");
    .form-findtype {
        margin-bottom: 0;
        padding-left: 10px;
        padding-top: 28px;
    }
    .login-container {
        width: 1100px;
        // height: 600px;
        overflow: hidden;
        box-shadow: 0px 0px 13px 5px rgb(14 25 80 / 20%);
        border-radius: 10px;

        .container-left {
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            background-color: #fff;

            .left-image {
                width: 60%;
                height: 60%;
                background-image: url("@/assets/img/login-bg.png");
            }

            .left-text {
                font-size: 40px;
                color: #14a7ff;

                .left-small {
                    font-size: 20px;
                }
            }

            // height: 600px;
        }

        .container-right {
            width: 440px;
            // height: 600px;
            padding: 20px 50px;
            padding-top: 50px;
            margin-left: 2px;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            background-color: #fff;

            .post-code {
                display: flex;
            }

            .login-register {
                color: #aaa;

                .register-button {
                    color: #14a7ff;
                    cursor: pointer;
                }
            }

            .right-title {
                color: #14a7ff;
                font-size: 30px;
            }

            .ant-input-affix-wrapper {
                border: none;
                border-bottom: 1px solid #e6e6e6;
                height: 50px;
                margin-top: 20px;

                // input {
                //     background-color: red;
                // }
            }

            .ant-input-affix-wrapper-focused {
                box-shadow: none !important;
                border-bottom: 1px solid #14a7ff;
            }

            .login-button {
                display: block;
                height: 50px;
                line-height: 50px;
                width: 82%;
                margin: 0 auto;
                border: none;
                margin-top: 40px;
                border-radius: 60px;
                background: #14a7ff;
                color: #fff;
                font-size: 18px;
                letter-spacing: 2px;
                cursor: pointer;
                transition: 0.3s all linear;

                &.disabled {
                    background: #ddd;
                }
            }
        }
    }
}
</style>
