<!--
 * @Descripttion: 重置数据
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
                    :isTable="true"
                    :isSearch="true"
                    @onShowSizeChange="getData"
                    @initData="getData"
                    :dataSource="tableData">
        <template #search>
            <a-form class="flex flex-warp"
                    :model="searchData">
                <a-form-item label="关键字:"
                             name="s">
                    <a-input v-model:value="searchData.s"
                             placeholder="请输入关键字" />
                </a-form-item>

                <a-form-item>
                    <a-button type="primary"
                              @click.prevent="onSubmit"
                              class="filter-search">
                        <SearchOutlined />
                        搜索
                    </a-button>
                    <a-button style="margin-left: 10px"
                              class="filter-reset"
                              @click="resetFieldsClick">
                        <SyncOutlined />重置
                    </a-button>
                </a-form-item>
            </a-form>
        </template>

    </page-container>

</template>

<script setup>
import { reactive, toRaw, ref, onMounted } from "vue";
import { Form, Empty, message } from "ant-design-vue";
import pageContainer from "@/components/page-container/page-container.vue";

import {
    rechargeDataList,
    rechargeDataListSearch,
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
const pageSize = ref(25);
// 空图片
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
// 查询数据
const searchData = reactive({
    s: "",
});
const isSearchData = ref(false);
const { resetFields, validate, validateInfos } = useForm(searchData);

const columns = [
    {
        title: "ID",
        dataIndex: "ID",
        fixed: "left",
        width: 120
    },
    {
        title: "用户UID",
        dataIndex: "RechargeUID",
        fixed: "left",
        width: 200
    },

    {
        title: "充值类型",
        dataIndex: "RechargeType",
        fixed: "left",
        width: 200
    },
    {
        title: "CDK",
        dataIndex: "RechargeCDK",
        fixed: "left",
        width: 200
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
    }

];
const tableData = ref([

]);

const getData = (flag) => {
    if (flag) {
        pageNum.value = 1;
    }
    let splicingData = {}, postFuc
    if (isSearchData.value) {
        postFuc = rechargeDataListSearch
        splicingData = searchData
    } else {
        postFuc = rechargeDataList
        splicingData = {
            page: pageNum.value
        }
    }

    postFuc({
        data: searchData,
        splicingData: splicingData,
    }).then((data) => {
        if (!isSearchData.value) {
            if (data.page == 1) {
                total.value = (data.rechargeData || data || []).length;
            } else {
                total.value = data.page * pageSize.value;
            }
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

