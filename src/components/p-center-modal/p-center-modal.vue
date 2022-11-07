<!--
 * @Descripttion: 中间弹窗
 * @Author: LiLei
 * @Date: 2021-11-24 15:14:41
 * @LastEditors: LiLei
 * @LastEditTime: 2022-11-07 15:15:15
-->
<template>
    <a-modal :visible="modalVisible"
             v-if="isFooter"
             centered
             @ok="confirm"
             @cancel="close"
             :title="title"
             :maskClosable="false"
             :class="[isAllHeight?'all-height-modal':'',isModalCustom?'':(isWidth80?'width80':'width60'),siteSettings.web_bg && !isNoBg?'pc-modal-bg':'']"
             :style="modalStyle"
             class="p-explain-center">
        <slot name="content"></slot>
    </a-modal>
    <a-modal :visible="modalVisible"
             v-else
             centered
             @ok="confirm"
             :footer="null"
             :title="title"
             @cancel="close"
             :style="modalStyle"
             :maskClosable="false"
             :class="[isAllHeight?'all-height-modal':'',isModalCustom?'':(isWidth80?'width80':'width60'),siteSettings.web_bg && !isNoBg?'pc-modal-bg':'']"
             class="p-explain-center">
        <slot name="content"></slot>
    </a-modal>
</template>
<script>
import { defineComponent, ref, toRefs, watch } from 'vue';
import {
    storeToRefs
} from 'pinia'
import {
    commonUtil
} from '@/utils/store';
// 生成响应式

export default defineComponent({
    props: {
        isNoBg: {
            type: Boolean,
            default: false
        },
        isWidth80: {
            type: Boolean,
            default: false
        },
        isAllHeight: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        modalVisible: {
            type: Boolean,
            default: true
        },
        isFooter: {
            type: Boolean,
            default: false
        }
    },
    setup (props, ctx) {
        const { modalVisible, title, isFooter, isWidth80 } = toRefs(props);
        const {
            siteSettings,
            bodyWidth,
        } = storeToRefs(commonUtil);
        const close = () => {
            // ctx.emit("update:visible", false);
            ctx.emit("close");
        }
        const confirm = () => {
            ctx.emit("confirm");
        }
        const modalStyle = ref({

        });
        const isModalCustom = ref(false);
        const calculationModalWidth = () => {
            let maxWidth = 800, activeWidth = 0;
            if (isWidth80.value) {
                activeWidth = bodyWidth.value * 0.8;
            } else {
                activeWidth = bodyWidth.value * 0.6;
            }
            if (activeWidth > maxWidth) {
                isModalCustom.value = true;
                modalStyle.value = {
                    width: maxWidth + 'px',
                    left: (bodyWidth.value - maxWidth) / 2 + 'px'
                }

            } else {
                modalStyle.value = {}
                isModalCustom.value = false;
            }
            console.log("activeWidth", activeWidth, modalStyle.value)
        }
        // 定义 watch 监听
        watch(
            bodyWidth,
            (newCount, old, clear) => {
                console.log("newCount, old", newCount, old)
                calculationModalWidth();
            }
            // watch 刚被创建的时候不执行
            // { lazy: true }
        );
        calculationModalWidth();

        return {
            siteSettings,
            isModalCustom,
            bodyWidth,
            modalStyle,
            confirm,
            isFooter,
            title,
            modalVisible,
            close,
        };
    },
});
</script>

<style lang="scss">
.p-explain-center {
    height: 100%;
    position: absolute;
    &.width80 {
        width: 80% !important;
        left: 10%;
    }
    &.width60 {
        width: 60% !important;
        left: 20%;
    }
    &.pc-modal-bg {
        .ant-modal-content,
        .ant-modal-header {
            @include hasBg();
        }
    }
    top: 0;
    display: flex !important;
    -webkit-flex-direction: column;
    flex-direction: column;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    .ant-modal-content {
        width: 100%;
        min-height: 200px !important;
        max-height: 80% !important;

        display: flex;
        -webkit-flex-direction: column;
        flex-direction: column;
        .ant-modal-body {
            // height: calc(100% - 55px);
            flex: 1;
            padding: 20px;
            padding-right: 30px;
            overflow-y: auto;
        }
    }
    &.all-height-modal {
        .ant-modal-content {
            height: 80%;
        }
    }
    // &.has-footer {
    //     .ant-modal-content {
    //         .ant-modal-body {
    //             // height: calc(100% - 108px);
    //         }
    //     }
    // }
}
</style>
