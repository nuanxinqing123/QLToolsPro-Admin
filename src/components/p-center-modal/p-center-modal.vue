<!--
 * @Descripttion: 中间弹窗
 * @Author: LiLei
 * @Date: 2021-11-24 15:14:41
 * @LastEditors: LiLei
 * @LastEditTime: 2022-09-29 16:06:48
-->
<template>
    <a-modal :visible="modalVisible"
             v-if="isFooter"
             centered
             @ok="confirm"
             @cancel="close"
             :title="title"
             :maskClosable="false"
             :class="[isAllHeight?'all-height-modal':'',isWidth80?'width80':'width60']"
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
             :maskClosable="false"
             :class="[isAllHeight?'all-height-modal':'',isWidth80?'width80':'width60']"
             class="p-explain-center">
        <slot name="content"></slot>
    </a-modal>
</template>
<script>
import { defineComponent, ref, toRefs } from 'vue';
export default defineComponent({
    props: {
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
        const { modalVisible, title, isFooter } = toRefs(props);
        const close = () => {
            // ctx.emit("update:visible", false);
            ctx.emit("close");
        }
        const confirm = () => {
            ctx.emit("confirm");
        }
        return {
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
