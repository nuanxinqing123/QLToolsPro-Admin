<!--
 * @Descripttion: 充值记录
 * @Author: LiLei
 * @Date: 2022-07-13 16:10:45
 * @LastEditors: LiLei
 * @Las tEditTime: 2022-07-13 16:17:03
-->
<template>
    <page-container :columns="columns"
                    v-model:pageSize="pageSize"
                    v-model:current="pageNum"
                    v-model:total="total"
                    isTable
                    @onShowSizeChange="getData"
                    @initData="getData"
                    :dataSource="tableData">

    </page-container>

</template>

<script setup>
import { reactive, toRaw, ref, onMounted } from "vue";
import { Form, Empty, message } from "ant-design-vue";
import pageContainer from "@/components/page-container/page-container.vue";

import {
    rechargeRecord,
} from "@/utils/api";
import {
    dateTtoDateStr,
} from "@/utils/common";
import {
    RollbackOutlined,
    SearchOutlined,
    SyncOutlined,
} from "@ant-design/icons-vue";
const popData = ref({});
const isPop = ref(false);
const useForm = Form.useForm;
// 列表总数
const total = ref(0);
// 当前页码
const pageNum = ref(1);
// 分页数量
const pageSize = ref(10);
// 空图片
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
// 查询数据
const searchData = reactive({
    s: "",
});
const isSearchData = ref(false);
const { resetFields, validate, validateInfos } = useForm(searchData);

const columns = ref([{
    "title": "序号",
    "dataIndex": "ID",
},
// {
//     "title": "更新时间",
//     "dataIndex": "UpdatedAt",
// },
{
    "title": "充值卡密",
    "dataIndex": "RechargeCDK",
}, {
    "title": "充值类型",
    "dataIndex": "RechargeType",
}, {
    "title": "创建时间",
    "dataIndex": "CreatedAt",
},]);
const tableData = ref([

]);

const getData = (flag) => {
    if (flag) {
        pageNum.value = 1;
    }
    let splicingData = {
        page: pageNum.value,
        quantity: pageSize.value
    }

    rechargeRecord({
        data: searchData,
        splicingData: splicingData,
    }).then((data) => {
        if (!isSearchData.value) {
            total.value = data.page * 20;
        } else {
            total.value = 0;
        }
        tableData.value = (data.rechargeData || data || []).map(item => {
            if (item.CreatedAt) {
                item.CreatedAt = dateTtoDateStr(item.CreatedAt);
            }
            if (item.UpdatedAt) {
                item.UpdatedAt = dateTtoDateStr(item.UpdatedAt);
            }
            return item;
        });
    });
}


const resetFieldsClick = () => {
    resetFields();
    isSearchData.value = false;
    getData();

};

const onSubmit = () => {
    validate()
        .then((value) => {
            if (searchData.s) {
                isSearchData.value = true;
            } else {
                isSearchData.value = false;
            }
            getData(true);

        })
        .catch((err) => {
            console.log("error", err);
        });
};

</script>

