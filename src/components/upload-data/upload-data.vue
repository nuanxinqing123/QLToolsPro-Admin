<!--
 * @Descripttion: 上传变量
 * @Author: LiLei
 * @Date: 2022-08-16 02:37:06
 * @LastEditors: LiLei
 * @LastEditTime: 2022-11-13 22:50:41
-->

<template>
    <a-form :model="formState"
            name="basic"
            v-bind="formItemLayout"
            @finish="onFinish"
            :rules="rules"
            @finishFailed="onFinishFailed">
        <a-form-item label="服务器:"
                     name="serverID">
            <a-select v-model:value="formState.serverID"
                      placeholder="请选择"
                      :filter-option="filterOption"
                      show-search
                      @change="serverChange"
                      option-label-prop="label"
                      :options="serverData">
            </a-select>
        </a-form-item>
        <a-form-item label="变量组:"
                     name="envName">
            <a-select v-model:value="formState.envName"
                      placeholder="请选择"
                      :filter-option="filterOption"
                      show-search
                      @change="envNameChange"
                      option-label-prop="label"
                      :options="envNameData">
            </a-select>
        </a-form-item>
        <a-form-item label="剩余位置"
                     name="serverID"
                     has-feedback>
            <a-input v-model:value="remainingPosition"
                     :disabled="true">
            </a-input>
        </a-form-item>

        <a-form-item name="envData"
                     label="变量值"
                     has-feedback
                     :rules="[{ required: true, message: '请输入变量值!' }]">
            <a-textarea v-model:value="formState.envData"
                        placeholder="请输入变量值!">
            </a-textarea>
        </a-form-item>
        <!-- <a-form-item name="nameRemarks"
                     label="备注"
                     has-feedback>
            <a-input v-model:value="formState.nameRemarks"
                     placeholder="可不填">
            </a-input>
        </a-form-item> -->
        <a-form-item :wrapper-col="{ offset: 4, span: 18 }">
            <a-button type="primary"
                      html-type="submit">提交</a-button>
        </a-form-item>
    </a-form>

    <a-modal v-model:visible="modal2Visible"
             :title="modalMsg"
             centered
             @ok="checkCdk">
        <a-input v-model:value="modalValue"
                 placeholder="请输入CD-KEY密钥"
                 size="large" />
    </a-modal>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { message } from "ant-design-vue";

import {
    uploadAdd, getPanelData, postCdk
} from "utils/api.js";
const emit = defineEmits(['tipChange'])
const modal2Visible = ref(false);
const tipText = ref('');
const modalMsg = ref('');
const modalValue = ref('');
const formItemLayout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 18,
    },
};
const rules = {

    serverID: [{
        required: true,
        trigger: 'change',
        message: '请输入服务器ID!'
    }],
    envName: [{ required: true, message: '请输入变量名!', trigger: 'change', }]
};
// 剩余位置
const remainingPosition = ref(0);
// 服务器内容
const serverData = ref([]);
// 变量组织
const envNameData = ref([]);
const formState = reactive({
    // "nameRemarks": "",//备注
    "serverID": "", //服务器ID
    "envName": "", //变量名
    "envData": "" //上传变量值
});
// 检查密钥
const checkCdk = () => {
    if (!modalValue.value) {
        message.error("请输入CD-KEY密钥！");
        return;
    }
    postCdk({
        data: {
            cdk: modalValue.value
        }
    }).then((data) => {
        message.success("更新CD-KEY密钥成功!");
        modal2Visible.value = false;
    });
}
const onFinish = values => {

    uploadAdd({
        data: {
            "server_id": formState.serverID,
            "env_name": formState.envName,
            "env_data": formState.envData,
        }
    }).then((data) => {
        message.success("变量提交成功");
    }).catch((error) => {
        // 需要校验CDK，请点击右上角按钮填写您的CDK
        // if (error.code == 5032) {
        //     modal2Visible.value = true;
        //     modalMsg.value = error.msg || '';
        // }
    })
    console.log('Success:', values);
};

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};

// 获取面板信息
const pageGetPanelData = () => {
    getPanelData({}).then((data) => {
        serverData.value = data.online.map(item => {
            return {
                label: item.PanelName,
                value: item.id,
                envData: item.env_data
            }
        });
        formState.serverID = serverData.value[0].value;
        try {

            envNameData.value = serverData.value[0].envData.map(item => {
                return {
                    label: item.EnvName,
                    value: item.EnvName,
                    quantity: item.EnvQuantity,
                    EnvTips: item.EnvTips
                }
            });
            formState.envName = envNameData.value[0].value;
            remainingPosition.value = envNameData.value[0].quantity;
            tipText.value = envNameData.value[0].EnvTips;
            emit("tipChange", tipText.value);

        } catch (error) {

        }

    })
}
const filterOption = (value, option) => {
    return option.label.indexOf(value) >= 0;
};

// 服务器联动
const serverChange = (id, data) => {
    formState.envName = "";
    remainingPosition.value = "";
    envNameData.value = [];
    tipText.value = '';
    emit("tipChange", tipText.value);
    try {
        envNameData.value = data.envData.map(item => {
            return {
                label: item.EnvName,
                value: item.EnvName,
                quantity: item.EnvQuantity,
                EnvTips: item.EnvTips
            }
        });
        formState.envName = envNameData.value[0].value;
        remainingPosition.value = envNameData.value[0].quantity;
        tipText.value = envNameData.value[0].EnvTips;
        emit("tipChange", tipText.value);
    } catch (error) {

    }
}

// 变量联动
const envNameChange = (value, data) => {
    remainingPosition.value = "";
    remainingPosition.value = data.quantity;

}
pageGetPanelData();


</script>
