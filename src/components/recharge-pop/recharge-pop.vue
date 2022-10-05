<!--
 * @Descripttion: 充值弹窗
 * @Author: LiLei
 * @Date: 2022-08-16 02:37:06
 * @LastEditors: LiLei
 * @LastEditTime: 2022-10-05 08:46:01
-->

<template>
    <p-center-modal :modalVisible="visible"
                    :isFooter="false"
                    @close="close"
                    :title="title">
        <template #content>
            <recharge-data :type="type"></recharge-data>
        </template>
    </p-center-modal>
</template>
<script setup>
import { reactive, computed, toRefs, ref } from 'vue';
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



</script>
