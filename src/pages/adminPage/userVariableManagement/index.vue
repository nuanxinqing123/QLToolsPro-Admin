<!--
 * @Descripttion: 用户变量管理
 * @Author: LiLei
 * @Date: 2022-07-13 16:10:45
 * @LastEditors: LiLei
 * @Las tEditTime: 2022-07-13 16:17:03
-->
<template>
    <edit-or-add v-model:visible="isPop"
                 @updateData="getData(true)"
                 :dataObj="popData">
    </edit-or-add>
    <page-container :columns="columns"
                    v-model:pageSize="pageSize"
                    v-model:current="pageNum"
                    v-model:total="total"
                    :isTable="true"
                    :isSearch="true"
                    @onShowSizeChange="getTableData"
                    @initData="getData"
                    :dataSource="tableData">
        <template #search>
            <a-form class="flex flex-warp"
                    :model="searchData">
                <a-form-item label="搜索类型:"
                             name="type">
                    <a-radio-group v-model:value="searchData.type">
                        <a-radio value="panel"
                                 name="type">面板</a-radio>
                        <a-radio value="user"
                                 name="type">用户</a-radio>
                    </a-radio-group>
                </a-form-item>
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
import { reactive, toRaw, ref, onMounted } from "vue";
import editOrAdd from "./editOrAdd.vue";
import { Form, Empty, message } from "ant-design-vue";
import pageContainer from "@/components/page-container/page-container.vue";

import {
    userVariableManagementDelete,
    userManagementList,
    userVariableManagementSearchAll,
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
const posetSearchData = ref({});
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
    type: "panel"
});
const isSearchData = ref(false);
const { resetFields, validate, validateInfos } = useForm(searchData);

const columns = [
    {
        title: "面板名称",
        dataIndex: "panel_name",
        width: 200
    },
    {
        title: '变量名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '变量值',
        dataIndex: 'value',
        key: 'value',
    },
    {
        title: "操作",
        dataIndex: "operation",
        customKey: "operation",
    }
    // {
    //     title: "变量",
    //     dataIndex: "isTree",
    //     customKey: "isTree",

    // },
    // {
    //     title: "操作",
    //     dataIndex: "operation",
    //     customKey: "operation",
    //     width: 200
    // }
];
const tableData = ref([

]);
// 是否打开弹窗
const setPop = (item) => {
    isPop.value = true;
    if (item) {
        popData.value = {
            ...item,
            title: "面板编辑"
        };
    } else {
        popData.value = {
            title: "面板新增"
        };
    }
}

// 删除面板
const deletRow = (item) => {
    userVariableManagementDelete({
        data: {
            "panel_name": item.panel_name,
            "id": item.id,
            "_id": item._id
        }
    }).then(() => {
        message.success("操作成功!");
        getData(true);
    })
}
const dataAll = ref([]);
// 获取分页数据
const getTableData = () => {
    //   const pageAllIndex = Math.ceil(total.value  / pageSize.value);
    let isEnd = false;
    let endSize = pageNum.value * pageSize.value;
    if (endSize > total.value) {
        endSize = total.value;
        isEnd = true;
    }
    tableData.value = dataAll.value.slice((pageNum.value - 1) * pageSize.value, endSize);

    console.log("dataAll.value ", tableData.value)

}
// 获取总数据
const getData = (flag) => {
    if (flag) {
        pageNum.value = 1;
    }
    let splicingData = posetSearchData.value;
    splicingData.page = pageNum.value;
    splicingData.quantity = pageSize.value;

    userVariableManagementSearchAll({
        data: searchData,
        splicingData: splicingData,
    }).then((data) => {
        dataAll.value = data.filter(item => item.panel_env && item.panel_name).map(item => {
            return item.panel_env ? item.panel_env.map(it => {
                it.panel_name = item.panel_name;
                if (it.CreatedAt) {
                    it.CreatedAt = dateTtoDateStr(it.CreatedAt);
                }
                if (it.UpdatedAt) {
                    it.UpdatedAt = dateTtoDateStr(it.UpdatedAt);
                }
                return it;
            }) : [];
        }).flat();
        total.value = dataAll.value.length;
        getTableData()
    });
}
posetSearchData.value = searchData;

const resetFieldsClick = () => {
    resetFields();
    isSearchData.value = false;
    getData(true);

};

const onSubmit = () => {
    validate()
        .then((value) => {
            posetSearchData.value = searchData;
            getData(true);
        })
        .catch((err) => {
            console.log("error", err);
        });
};

</script>

