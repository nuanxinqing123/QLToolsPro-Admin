<!--
 * @Descripttion: 上传记录
 * @Author: LiLei
 * @Date: 2022-08-26 11:35:11
 * @LastEditors: LiLei
 * @LastEditTime: 2022-09-29 16:55:49
-->
<template>
    <a-table :columns="columns"
             :data-source="dataSource"
             :pagination="false" />
</template>

<script setup>
import { ref, toRefs } from 'vue';
import {
    uploadRecords
} from "utils/api.js";
import {
    dateTtoDateStr,
} from "@/utils/common";
const columns = ref([{
    "title": "序号",
    "dataIndex": "ID",
}, {
    "title": "创建时间",
    "dataIndex": "CreatedAt",
}, {
    "title": "更新时间",
    "dataIndex": "UpdatedAt",
}, {
    "title": "充值卡密",
    "dataIndex": "RechargeCDK",
}, {
    "title": "充值类型",
    "dataIndex": "RechargeType",
}]);
const pageIndex = ref(1);
const dataSource = ref([]);
// 获取数据
const getData = () => {
    uploadRecords({
        splicingData: {
            page: pageIndex.value
        }
    }).then((data) => {
        dataSource.value = data.pageData.map(item => {
            if (item.CreatedAt) {
                item.CreatedAt = dateTtoDateStr(item.CreatedAt);
            }
            if (item.UpdatedAt) {
                item.UpdatedAt = dateTtoDateStr(item.UpdatedAt);
            }
        });
    })
}
getData();
</script>

<style lang="scss">
</style>
