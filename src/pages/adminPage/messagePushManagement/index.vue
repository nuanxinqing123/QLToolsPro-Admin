<!--
 * @Descripttion: 用户管理
 * @Author: LiLei
 * @Date: 2022-07-13 16:10:45
 * @LastEditors: LiLei
 * @Las tEditTime: 2022-07-13 16:17:03
-->
<template>
    <pop v-model:visible="isPop"
         :dataObj="popData"
         @updateData="getData">
    </pop>
    <page-container :columns="columns"
                    isRowSelection
                    :row-selection="rowSelection"
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
                <a-form-item>
                    <a-button type="primary"
                              @click.prevent="setPop"
                              class="filter-search">
                        消息群发
                    </a-button>
                </a-form-item>
            </a-form>
        </template>

    </page-container>

</template>

<script setup>
import pop from "./pop.vue";

import { reactive, toRaw, ref, onMounted, computed, unref } from "vue";
import { Form, Empty, message } from "ant-design-vue";
import pageContainer from "@/components/page-container/page-container.vue";

import {
    messagePushManagementList,
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

const columns = [

    {
        title: "用户UID",
        dataIndex: "UserID",
    },
    {
        title: "用户名",
        dataIndex: "Username",
    },
    {
        title: "用户WxpusherID",
        dataIndex: "UserWxpusher",
    },
];
const tableData = ref([

]);
// 是否打开弹窗
const setPop = () => {
    if (!selectedRowKeys.value.length) {
        message.error('请先选择用户');
        return;
    }
    popData.value = selectedRowKeys.value;
    isPop.value = true;
}
const getData = (flag) => {
    if (flag) {
        pageNum.value = 1;
    }
    let splicingData = {
        page: pageNum.value,
        quantity: pageSize.value
    }
    messagePushManagementList({
        data: searchData,
        splicingData: splicingData,
    }).then((data) => {
        if (!isSearchData.value) {
            total.value = data.page * pageSize.value;
        } else {
            total.value = 0;
        }
        tableData.value = (data.pageData || data || []).map(item => {
            item.key = item.UserID;
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
            isSearchData.value = true;
            console.log("value", value)
            getData();
        })
        .catch((err) => {
            console.log("error", err);
        });
};



const selectedRowKeys = ref([]); // Check here to configure the default column
const selectedArr = ref([]); // Check here to configure the default column
// 清除所有选择
const clearSelectAll = () => {
    selectedRowKeys.value = [];
    selectedArr.value = [];
};
const onSelect = (item, flag) => {
    console.log("item, flag", item, flag)
    if (flag) {

        selectedRowKeys.value.push(item.key);
        selectedArr.value.push(item);
    } else {
        // 反选
        selectedRowKeys.value = selectedRowKeys.value.filter(
            (it) => item.key != it
        );
        selectedArr.value = selectedArr.value.filter(
            (it) => it.key != item.key
        );
    }
};

const onSelectAll = (flag, selectArr, arr) => {
    const ids = arr.map((item) => item.key);
    if (flag) {
        let isAcceptanceDisabledNum = 0,
            selectedRowKeysArr = selectedRowKeys.value;
        // 全选
        for (const id of ids) {
            const itemObj =
                arr.filter((item) => item.key == id)[0] || {};
            if (!selectedRowKeysArr.includes(id)) {
                selectedRowKeysArr.push(id);
                selectedArr.value.push(itemObj);
            }
        }
        selectedRowKeys.value = [];
        setTimeout(() => {
            selectedRowKeys.value = selectedRowKeysArr;
        });
    } else {
        // 反选
        selectedRowKeys.value = selectedRowKeys.value.filter(
            (item) => !ids.includes(item)
        );
        selectedArr.value = selectedArr.value.filter(
            (item) => !ids.includes(item.key)
        );
    }
};
// 选择
const rowSelection = computed(() => {
    return {
        onSelect: onSelect,
        selectedRowKeys: unref(selectedRowKeys),
        onSelectAll: onSelectAll,
        selections: [
            {
                key: "odd",
                text: "清除当前页选择",
                onSelect: () => {
                    const ids = tableData.value.map((item) => item.key);

                    selectedRowKeys.value =
                        selectedRowKeys.value.filter(
                            (item) => !ids.includes(item)
                        );
                    selectedArr.value = selectedArr.value.filter(
                        (item) => !ids.includes(item.key)
                    );
                },
            },
            {
                key: "odd",
                text: "清除所有选择",
                onSelect: () => {
                    clearSelectAll();
                },
            },
        ],
    };
});
</script>


