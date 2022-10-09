<template>
    <!-- 准备页面 -->
    <div class="loading flex align-items"
         :class="isMobile?'mobile-loading':''">
        <div class="loadingio-spinner-ripple-c8dpizgopqs">
            <div class="ldio-sbbdf3moufl flex align-items">

                <img src="@/assets/img/logo.png"
                     alt="logo"
                     class="logo" />
                <div class="children-view"></div>
                <div class="children-view"
                     style="border-color: #00832b;"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    commonUtil
} from '@/utils/store';
import {
    storeToRefs
} from 'pinia';
// 生成响应式
const {
    isMobile,
} = storeToRefs(commonUtil);
// 跳转页面
let token = commonUtil.getItem('token');
if (token) {
    // 免密登录
    commonUtil
        .checkUserToken()
        .then()
        .catch(() => {
            // 跳转登录页面
            commonUtil.navigateTo("login");
        });
} else {
    // 跳转登录页面
    commonUtil.navigateTo("login");
}
</script>

<style lang="scss">
@keyframes ldio-sbbdf3moufl {
    0% {
        top: 294px;
        left: 294px;
        width: 0;
        height: 0;
        opacity: 1;
    }
    100% {
        top: 57px;
        left: 57px;
        width: 474px;
        height: 474px;
        opacity: 0;
    }
}
.loading {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
}
.ldio-sbbdf3moufl .children-view {
    position: absolute;
    border-width: 2px;
    border-style: solid;
    opacity: 1;
    border-radius: 50%;
    animation: ldio-sbbdf3moufl 1.6949152542372878s cubic-bezier(0, 0.2, 0.8, 1)
        infinite;
}

.ldio-sbbdf3moufl .children-view:nth-child(1) {
    border-color: #00832b;
}

.ldio-sbbdf3moufl .children-view:nth-child(2) {
    border-color: #00832b;
    animation-delay: -0.8474576271186439s;
}

.loadingio-spinner-ripple-c8dpizgopqs {
    width: 600px;
    height: 600px;
    display: inline-block;
    overflow: hidden;
    background: #ffffff;
    .logo {
        max-width: 100px;
        border-radius: 50%;
    }
}
// .loadingio-spinner-ripple-c8dpizgopqs image {
//     position: absolute;
//     width: 100px;
//     height: 100px;
//     top: 245px;
//     left: 245px;
//     z-index: 10;
// }
.ldio-sbbdf3moufl {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0; /* see note above */
}
// .ldio-sbbdf3moufl view {
//     box-sizing: content-box;
// }

.mobile-loading {
    .loadingio-spinner-ripple-c8dpizgopqs {
        width: 90vw;
        height: 90vw;
    }
    .logo {
        max-width: 30vw;
    }
    // .loadingio-spinner-ripple-c8dpizgopqs image {
    //     width: 10vw;
    //     height: 10vw;
    //     top: 0;
    //     left: 0;
    // }
    @keyframes ldio-mobile {
        0% {
            // top: 0;
            // left: 10px;
            width: 70vw;
            height: 70vw;
            opacity: 1;
        }
        100% {
            // top: 0px;
            // left: 20vw;
            width: 50vw;
            height: 50vw;
            opacity: 0;
        }
    }
    .ldio-sbbdf3moufl .children-view {
        animation: ldio-mobile 1.6949152542372878s cubic-bezier(0, 0.2, 0.8, 1)
            infinite;
    }
}
</style>
