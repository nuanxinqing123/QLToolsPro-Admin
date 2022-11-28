<!--
 * @Descripttion: 变量管理
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
                    @onShowSizeChange="getData"
                    @initData="getData"
                    :dataSource="tableData">
        <template #search>
            <a-form class="flex flex-warp"
                    :model="searchData">

                <a-form-item>
                    <a-button type="primary"
                              @click.prevent="setPop()"
                              class="filter-search">
                        新增
                    </a-button>
                </a-form-item>

                <a-popconfirm placement="topLeft"
                              ok-text="是"
                              cancel-text="否"
                              @confirm="refreshCache">
                    <template #title>
                        是否确认刷新缓存？
                    </template>
                    <a-button type="danger"
                              style="margin-left: 10px;"
                              shape="round">手动刷新缓存
                    </a-button>
                </a-popconfirm>
            </a-form>
        </template>
        <template #bodyCell="{ text, record, index, column }">
            <template v-if="column.customKey === 'money'">
                <count-animation :num="text"></count-animation>
            </template>
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
import countAnimation from "@/components/count-animation/count-animation.vue";
import pageContainer from "@/components/page-container/page-container.vue";

import {
    refreshCacheManually,
    variableManagementList,
    variableManagementDelete,
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
        title: "ID",
        dataIndex: "ID",
        fixed: "left",
        width: 120
    },
    {
        title: "变量名",
        dataIndex: "EnvName",
        // fixed: "left",
        width: 200
    },
    {
        title: "变量备注",
        dataIndex: "EnvRemarks",
        // fixed: "left",
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
    // {
    //     title: "创建时间",
    //     dataIndex: "CreatedAt",
    //     width: 280
    // },
    {
        title: "操作时间",
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
const tableData = ref([

]);
// 手动刷新缓存
const refreshCache = () => {
    refreshCacheManually();
}
// 是否打开弹窗
const setPop = (item) => {
    isPop.value = true;
    if (item) {
        popData.value = {
            ...item,
            title: "变量编辑"
        };
    } else {
        popData.value = {
            title: "变量新增"
        };
    }
}

// 删除面板
const deletRow = (item) => {
    variableManagementDelete({
        data: {
            id: [item.ID]
        }
    }).then(() => {
        message.success("操作成功!");
        getData(true);
    })
}

const getData = (flag) => {
    if (flag) {
        pageNum.value = 1;
    }
    let splicingData = {
        page: pageNum.value,
        quantity: pageSize.value
    };

    variableManagementList({
        data: searchData,
        splicingData: splicingData,
    }).then((data) => {
        if (!isSearchData.value) {
            total.value = data.page * pageSize.value;
        } else {
            total.value = 0;
        }
        tableData.value = (data.pageData || data || []).map(item => {
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

