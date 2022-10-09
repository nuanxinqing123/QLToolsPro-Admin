<!--
 * @Descripttion: 绑定变量
 * @Author: LiLei
 * @Date: 2022-08-22 16:44:50
 * @LastEditors: LiLei
 * @LastEditTime: 2022-10-09 19:13:18
-->
<template>
    <p-center-modal :modalVisible="visible"
                    :isFooter="false"
                    @close="close"
                    title="绑定变量">
        <template #content>
            <a-form ref="formRef"
                    name="custom-validation"
                    :model="formState"
                    :rules="rules"
                    v-bind="layout"
                    @validate="handleValidate"
                    @finishFailed="handleFinishFailed"
                    @finish="handleFinish">
                <a-form-item label="变量名称"
                             name="name">
                    <!-- <a-select v-model:value="formState.name"
                              placeholder="请选择"
                              :filter-option="filterOption"
                              show-search
                              option-label-prop="label"
                              :options="variableData">
                    </a-select> -->
                    <a-checkbox-group v-model:value="formState.name"
                                      style="width: 100%">
                        <a-row>
                            <a-col :span="8"
                                   v-for="(item,index) in variableData"
                                   :key="index">
                                <a-checkbox :value="item.value">{{item.label}}</a-checkbox>
                            </a-col>
                            <!-- <a-col :span="8">
                                <a-checkbox value="B">B</a-checkbox>
                            </a-col>
                            <a-col :span="8">
                                <a-checkbox value="C">C</a-checkbox>
                            </a-col>
                            <a-col :span="8">
                                <a-checkbox value="D">D</a-checkbox>
                            </a-col>
                            <a-col :span="8">
                                <a-checkbox value="E">E</a-checkbox>
                            </a-col> -->
                        </a-row>
                    </a-checkbox-group>
                </a-form-item>

                <a-divider />

                <a-form-item :wrapper-col="{ span: 12, offset: 12 }"
                             class="timed-start-button">
                    <a-button @click="close">取消</a-button>
                    <a-button type="primary"
                              style="margin-left: 20px"
                              html-type="submit">提交</a-button>
                </a-form-item>
            </a-form>
        </template>
    </p-center-modal>
</template>

<script setup>
import pCenterModal from "@/components/p-center-modal/p-center-modal.vue";

import { ref, reactive, toRefs, watch } from 'vue';
const props = defineProps({
    dataObj: Object,
    visible: Boolean,
});
import { message } from "ant-design-vue";
import dayjs from 'dayjs';
import {
    variableManagementList,
    panelManagementBinding,
} from "@/utils/api";
import {
    numberToString,
} from "@/utils/common";
const {
    visible,
    dataObj
} = toRefs(props);
const emit = defineEmits(['update:visible', 'updateData']);
const close = () => {
    emit('update:visible', false);
}
const formState = reactive({
    "name": [],
});
const rules = {
    name: [{
        required: true,
        trigger: 'change',
        message: "请选择变量名称"
    }],

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
const filterOption = (value, option) => {
    return option.label.indexOf(value) >= 0;
};
const handleFinish = values => {
    let postData = {
    }
    postData = {
        id: dataObj.value.ID,
        "env_binding": formState.name, //面板名称
    }
    panelManagementBinding({
        data: postData
    }).then(() => {
        message.success('操作成功');
        emit("updateData", postData);
        close();
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
    formState.name = [];

    getData();
}
const variableData = ref([]);
// 获取变量名称
const getData = () => {
    variableManagementList({
        splicingData: {
            page: 1,
            quantity: 100,
        }
    }).then((data) => {
        variableData.value = (data.pageData || []).map(item => {
            item.label = item.EnvTips;
            item.value = item.ID;
            return item;
        })
    })
}
</script>

<style lang="scss">
.timed-start-button {
    margin-bottom: 0;
    text-align: right;
}
</style>
