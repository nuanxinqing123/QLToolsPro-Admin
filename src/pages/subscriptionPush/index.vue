<!--
 * @Descripttion: 订阅推送
 * @Author: LiLei
 * @Date: 2022-09-29 12:12:51
 * @LastEditors: LiLei
 * @LastEditTime: 2022-10-13 22:20:07
-->
<template>
    <div class="subscription-push flex align-items bg-cover">
        <div class="subscription-push-content"
             v-if="qrcodeUrl">
            <a-image width="100%"
                     :src="qrcodeUrl" />
            <div class="push-text text-center">请使用手机微信扫码绑定</div>
        </div>
    </div>
</template>

<script setup>
import {
    commonUtil
} from '@/utils/store';
import {
    onUnmounted,
    computed,
    reactive,
    ref
} from 'vue';
import {
    wxpusherUpdate,
    wxpusherBindState,
    wxpusherQrcode
} from "utils/api.js";


const times = ref(null);
const wait = 1000 * 10;
const qrcodeUrl = ref('');
const qrcode = ref("");
const wx_uid = ref('');
// 获取订阅二维码
const getWxpusherQrcode = () => {
    wxpusherQrcode().then(data => {
        qrcodeUrl.value = data.shortUrl;
        qrcode.value = data.code;
    })
}
// 检查绑定状态
const getWxpusherState = () => {

    wxpusherBindState({
        splicingData: {
            code: qrcode.value
        }
    }).then(data => {
        wx_uid.value = data;
        closeTimes();
        updateBindState();
    }).catch((e) => { });
}
// 检查用户WxPusher订阅状态
const updateBindState = () => {
    wxpusherUpdate({
        splicingData: {
            wx_uid: wx_uid.value
        }
    }).then(data => {
        commonUtil.initGopage();
    })
}
times.value = setInterval(() => {
    getWxpusherState();
}, wait);

// 关闭定时器
const closeTimes = () => {
    if (times.value) {
        clearInterval(times.value);
        times.value = null;
    }
}
onUnmounted(() => {
    closeTimes();
})
getWxpusherQrcode();
</script>

<style lang="scss">
.subscription-push {
    width: 100vw;
    height: 100vh;
    background-image: url("@/assets/img/push-bg.jpg");
    .subscription-push-content {
        padding: 65px;
        border-radius: 4px;
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
        background-color: #fff;
        width: 380px;
        height: 450px;
        box-shadow: 0 2px 10px #999;
        -moz-box-shadow: #999 0 2px 10px;
        -webkit-box-shadow: #999 0 2px 10px;
        .ant-image {
            display: block;
        }
        .push-text {
            color: #333;
            font-size: 20px;
            margin-top: 30px;
        }
    }
}
</style>
