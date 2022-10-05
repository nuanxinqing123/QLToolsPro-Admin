<!--
 * @Descripttion: 容器样式
 * @Author: LiLei
 * @Date: 2021-11-14 10:33:11
 * @LastEditors: LiLei
 * @LastEditTime: 2022-10-05 09:50:40
-->
<template>
    <div class="flex flex-column pc-container">
        <div class="container-title">
            <div class="container-title-content">
                <div class="title-text flex content-between">
                    <div class="tilte-left">
                        {{title}}
                    </div>
                    <slot name="title"></slot>
                </div>
            </div>

        </div>
        <!-- 表格 -->
        <div class="container-table flex-base flex flex-column"
             ref="myRef">
            <div class="load-spin flex align-items flex-base"
                 v-if="!contentHeight || (isLoad && loading)">
                <a-spin />
            </div>
            <template v-else>
                <slot name="content"
                      :width="contentWidth"
                      :height="contentHeight"
                      v-if="contentHeight && data.length"></slot>
                <div class="flex-base flex align-items p-no-data"
                     v-else>
                    <a-empty />
                </div>
            </template>

        </div>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted, toRefs, nextTick } from 'vue';
import { Empty } from 'ant-design-vue';
export default defineComponent({
    props: {
        isWatch: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: ''
        },
        isLoad: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        data: {
            type: Array,
            default: [1]
        }
    },
    setup (props, ct) {
        const { title, isLoad, loading, data, isWatch } = toRefs(props);
        const myRef = ref(null);
        const contentHeight = ref(0);
        const contentWidth = ref(0);
        // const simpleImage = img;
        if (isWatch.value) {
            onMounted(() => {
                contentHeight.value = myRef.value.offsetHeight;
                contentWidth.value = myRef.value.offsetWidth;
            })
            // 监听屏幕变化
            window.addEventListener("resize", () => {
                if (!myRef.value || !myRef.value.offsetHeight) {
                    return;
                }
                contentHeight.value = 0;
                setTimeout(() => {
                    contentHeight.value = myRef.value.offsetHeight;
                    contentWidth.value = myRef.value.offsetWidth;
                }, 1000)
                // console.log("窗口变化", myRef.value.offsetHeight)
            })
        }

        return {
            contentWidth,
            contentHeight,
            myRef,
            title,
            isLoad,
            loading,
        };
    },
});
</script>
<style lang="scss">
.pc-container {
    width: 60%;
    // min-height: 200px;
    position: relative;
    padding: 0 15px;
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 20px;
    box-shadow: 0px 4px 34px 0px rgba(0, 0, 0, 0.04);
    .container-table {
        width: 100%;
        // overflow: hidden;
        // overflow-y: auto;
        padding: 10px 0;
        // 加载
        .load-spin {
            width: 100%;
            height: 100%;
        }
        &::-webkit-scrollbar {
            width: 10px;
        }

        &::-webkit-scrollbar-track {
            background-color: #00071d;
            -webkit-border-radius: 2em;
            -moz-border-radius: 2em;
            border-radius: 2em;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #3e93ef;
            -webkit-border-radius: 2em;
            -moz-border-radius: 2em;
            border-radius: 2em;
        }
    }

    .container-title {
        // margin-top: 10px;
        // margin-bottom: 22px;
        line-height: 50px;
        // margin-bottom: 11px;
        .container-title-content {
            width: 100%;
            // overflow: hidden;
        }
        border-bottom: 2px solid #cccccc;

        .title-text {
            color: #333333;
            font-size: 18px;
            // margin-bottom: 8px;
            @media screen and (max-width: 1440px) {
                font-size: 16px;
            }
        }
    }
}
.p-no-data {
    .ant-empty-description {
        color: #dddddd;
        font-size: 12px;
    }
    .ant-empty-image {
        width: 60px;
        height: 40px;
    }
}
</style>
