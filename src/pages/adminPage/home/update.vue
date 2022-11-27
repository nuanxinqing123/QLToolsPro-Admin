<!--
 * @Descripttion: 更新系统
 * @Author: LiLei
 * @Date: 2022-08-16 02:37:06
 * @LastEditors: LiLei
 * @LastEditTime: 2022-11-27 22:12:34
-->

<template>
    <p-center-modal :modalVisible="visible"
                    :isFooter="false"
                    @close="close"
                    title="版本更新提示">
        <template #content>
            <div class="update-container">
                <ul>
                    <li>当前版本：{{dataObj.LocVersion}}</li>
                    <li>最新版本：{{dataObj.Version}}</li>
                </ul>
                <div v-html="dataObj.Update"
                     class="update-content"></div>
                <a-divider />

                <div class="flex content-end">
                    <div style="line-height:30px;margin-top: 20px;">
                        服务器架构：
                    </div>
                    <a-select v-model:value="framework"
                              :options="selectDatas"
                              placeholder="请选择"
                              style="width: 200px;margin-top: 20px;"></a-select>
                    <a-popconfirm placement="topLeft"
                                  ok-text="确认"
                                  cancel-text="取消"
                                  @confirm="updateSystem()">
                        <template #title>
                            此操作会覆盖原有内容？
                        </template>
                        <a-button type="primary"
                                  style="margin-left: 20px;margin-top: 20px"
                                  html-type="submit">在线更新</a-button>
                    </a-popconfirm>
                    <a-button @click="close"
                              style="margin-top: 20px;margin-left: 20px;">取消</a-button>
                </div>
            </div>

        </template>
    </p-center-modal>
</template>
<script setup>
import { reactive, computed, toRefs, ref, watch } from 'vue';
import pCenterModal from "@/components/p-center-modal/p-center-modal.vue";
import {
    softwareUpdate,
} from "utils/api.js";
const props = defineProps({
    visible: Boolean,
    type: String,
    dataObj: Object
});
const {
    dataObj,
    type,
    visible,
} = toRefs(props);

const title = ref('充值');
const emit = defineEmits(['update:visible', 'updateData']);
const framework = ref('amd64');//"amd64" //（CPU架构）参数：arm64、amd64
const selectDatas = [{
    value: 'arm64',
    label: 'arm64',
}, {
    value: 'amd64',
    label: 'amd64',
}]
const updateData = () => {
    emit("updateData");
}
const close = () => {
    emit('update:visible', false);
}
defineExpose({
    close, updateData
})

// 更新系统
const updateSystem = () => {
    softwareUpdate({
        data: {
            framework: framework.value
        }
    }).then(() => {
        close();
    });
}


</script>

<style lang="scss">
.update-container {
    ul,
    ol {
        list-style: disc;
        margin-bottom: 0;
        padding-left: 15px;
    }
    .update-content {
        margin-bottom: 15px;
    }
}
</style>
