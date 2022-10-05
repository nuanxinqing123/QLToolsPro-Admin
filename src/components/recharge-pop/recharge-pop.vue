<!--
 * @Descripttion: 充值弹窗
 * @Author: LiLei
 * @Date: 2022-08-16 02:37:06
 * @LastEditors: LiLei
 * @LastEditTime: 2022-10-05 09:46:54
-->

<template>
    <p-center-modal :modalVisible="visible"
                    :isFooter="false"
                    @close="close"
                    :title="title">
        <template #content>
            <recharge-data ref="popRef"></recharge-data>
        </template>
    </p-center-modal>
</template>
<script setup>
import { reactive, computed, toRefs, ref, watch } from 'vue';
import pCenterModal from "@/components/p-center-modal/p-center-modal.vue";
import rechargeData from "@/components/recharge-data/recharge-data.vue";

const props = defineProps({
    visible: Boolean,
    type: String,
});
const {
    type,
    visible,
} = toRefs(props);

const title = ref('充值');
const emit = defineEmits(['update:visible', 'updateData']);
const close = () => {
    emit('update:visible', false);
}

const popRef = ref(null);

// 定义 watch 监听
// 定义 watch 监听
watch(
    visible,
    (newCount, old, clear) => {
        // 如果 watch 监听被重复执行了，则会先清除上次未完成的异步任务
        if (visible.value) {
            if (popRef.value) {
                popRef.value.setType(type.value);
            } else {
                setTimeout(() => {
                    popRef.value.setType(type.value);
                }, 100);
            }
        }
    }
    // watch 刚被创建的时候不执行
    // { lazy: true }
);

</script>
