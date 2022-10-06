<!--
 * @Descripttion: 容器管理
 * @Author: LiLei
 * @Date: 2022-10-05 17:14:08
 * @LastEditors: LiLei
 * @LastEditTime: 2022-10-06 14:41:14
-->
<template>
    <page-container :columns="columns"
                    v-model:current="pageNum"
                    v-model:total="total"
                    :isTable="true"
                    :dataSource="dataSource">

        <template #bodyCell="{ text, record, index, column }">
            <template v-if="column.customKey === 'operation'">

                <a-button type="primary"
                          @click.stop="setPop(record)"
                          style="margin-left: 10px;margin-bottom:10px;"
                          shape="round">修改
                </a-button>
                <a-popconfirm placement="topLeft"
                              ok-text="是"
                              cancel-text="否"
                              @confirm="deletRow(record)">
                    <template #title>
                        是否确认删除？
                    </template>
                    <a-button type="danger"
                              style="margin-left: 10px;margin-bottom:10px;"
                              shape="round">删除
                    </a-button>
                </a-popconfirm>

            </template>
        </template>
    </page-container>

</template>

<script setup>
import { ref, reactive, toRefs, watch } from 'vue';
const pageNum = ref(1);
const total = ref(3);
import pageContainer from "@/components/page-container/page-container.vue";
const columns = [
    {
        title: "ID",
        dataIndex: "ID",
        fixed: "left",
        width: 120
    },
    {
        title: "变量名",
        dataIndex: "EnvName",
        fixed: "left",
        width: 200
    },
    {
        title: "变量备注",
        dataIndex: "EnvRemarks",
        fixed: "left",
        width: 200
    },
    {
        title: "变量限额",
        dataIndex: "EnvQuantity",
        width: 200
    },
    {
        title: "变量提交正则",
        dataIndex: "EnvRegex",
        width: 200
    },
    {
        title: "变量模式",
        dataIndex: "EnvMode",
        width: 200
    },
    {
        title: "变量更新匹配正则",
        dataIndex: "EnvUpdate",
        width: 200
    },
    {
        title: "变量是否使用插件",
        dataIndex: "EnvIsPlugin",
        width: 200
    },
    {
        title: "变量绑定的插件名称",
        dataIndex: "EnvPluginName",
        width: 280
    },
    {
        title: "变量是否计费",
        dataIndex: "EnvIsCharging",
        width: 280
    },
    {
        title: "变量提交积分扣额",
        dataIndex: "EnvNeedIntegral",
        width: 280
    },
    {
        title: "变量提示内容",
        dataIndex: "EnvTips",
        width: 280
    },
    {
        title: "创建时间",
        dataIndex: "CreatedAt",
        width: 280
    },
    {
        title: "更新时间",
        dataIndex: "UpdatedAt",
        width: 280
    },
    {
        title: "操作",
        dataIndex: "operation",
        customKey: "operation",
        fixed: "right",
        width: 300,
    }
];
const dataSource = [
    {},
    {},
    {},
    {},
]
</script>

