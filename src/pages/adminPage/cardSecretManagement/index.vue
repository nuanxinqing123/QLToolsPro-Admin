<!--
 * @Descripttion: 卡密管理
 * @Author: LiLei
 * @Date: 2022-07-13 16:10:45
 * @LastEditors: LiLei
 * @Las tEditTime: 2022-07-13 16:17:03
-->
<template>
    <generate-card-secret v-model:visible="isAddPop"
                          @updateData="getData(true)"></generate-card-secret>
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
                    :rules="rules"
                    @finish="onSubmit"
                    :model="searchData">
                <a-form-item label="类型:"
                             name="ctype">
                    <a-select v-model:value="searchData.ctype"
                              placeholder="请选择"
                              style="width: 200px"
                              :options="options"></a-select>
                </a-form-item>

                <a-form-item label="关键字:"
                             name="s">
                    <a-input v-model:value="searchData.s"
                             placeholder="请输入关键字" />
                </a-form-item>

                <a-form-item>
                    <a-button type="primary"
                              @click.stop="isAddPop=true"
                              shape="round">生成卡密
                    </a-button>
                    <a-button type="primary"
                              html-type="submit"
                              style="margin-left: 10px;"
                              class="filter-search">
                        <SearchOutlined />
                        搜索
                    </a-button>
                    <a-button style="margin-left: 10px"
                              class="filter-reset"
                              @click="resetFieldsClick">
                        <SyncOutlined />重置
                    </a-button>
                    <!-- <a-button shape="round"
                              style="margin-left:10px;"
                              @click="downloadExcel">
                        <download-outlined />
                        下载模板
                    </a-button> -->
                </a-form-item>
            </a-form>
        </template>
        <template #bodyCell="{ text, record, index, column }">

            <template v-if="column.customKey === 'state'">
                <a-button type="link"
                          primary
                          v-if="record.CdKeyState"
                          class="state-button state-enable">启用</a-button>
                <a-button type="link"
                          danger
                          class="state-button"
                          v-else>禁用</a-button>
            </template>
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
import { reactive, toRaw, ref, onMounted, computed } from "vue";
import editOrAdd from "./editOrAdd.vue";
import generateCardSecret from "./generateCardSecret.vue";
import pageContainer from "@/components/page-container/page-container.vue";

import { Form, Empty, message } from "ant-design-vue";
import {
    cardSecretManagementAddDownload,
    cardSecretManagementListSearchAll,
    cardSecretManagementListSearch,
    cardSecretManagementList,
    cardSecretManagementDelete,
} from "@/utils/api";
import {
    dateTtoDateStr,
} from "@/utils/common";
import {
    DownloadOutlined,
    RollbackOutlined,
    SearchOutlined,
    SyncOutlined,
} from "@ant-design/icons-vue";
const popData = ref({});
const isAddPop = ref(false);
const isPop = ref(false);
const postSearchData = ref({});
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
    ctype: "" // vip
});
const isSearchData = ref(false);
const { resetFields, validate, validateInfos } = useForm(searchData);
const rules = computed(() => {
    return {
        s: [{
            required: false,//!searchData.ctype,
            trigger: 'change',
            message: "请输入关键字"
        }],
    }
});
const options = ref([
    {
        value: "",
        label: "全部"
    },
    {
        value: "integral",
        label: "积分"
    },
    {
        value: "vip",
        label: "会员"
    }
])
const columns = [
    {
        title: "ID",
        dataIndex: "ID",
        fixed: "left",
        width: 120
    },
    {
        title: "卡密显示",
        dataIndex: "CdKey",
        // fixed: "left",
        width: 200
    },
    {
        title: "类型",
        dataIndex: "CdKeyTypeStr",
        // fixed: "left",
        width: 200
    },
    {
        title: "积分",
        dataIndex: "CdKeyIntegral",
        width: 200
    },
    {
        title: "有效期",
        dataIndex: "CdKeyValidityPeriod",
        width: 200
    },
    {
        title: "标识",
        dataIndex: "CdKeyRemarks",
        width: 200
    },
    {
        title: "状态",
        dataIndex: "CdKeyState",
        customKey: "state",
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
// 是否打开弹窗
const setPop = (item) => {
    isPop.value = true;
    if (item) {
        popData.value = {
            ...item,
            title: "卡密编辑"
        };
    } else {
        popData.value = {
            title: "卡密新增"
        };
    }
}
// 下载模板
const downloadExcel = () => {
    cardSecretManagementAddDownload();
}
// 删除面板
const deletRow = (item) => {
    cardSecretManagementDelete({
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
    let postFuc = null;
    let splicingData = {
        page: pageNum.value
    };
    let isTable = false;
    if (postSearchData.value.ctype) {
        // 筛选查询
        if (postSearchData.value.s) {
            postFuc = cardSecretManagementListSearch;
            splicingData = {
                s: postSearchData.value.s || '',
                ctype: postSearchData.value.ctype,
            };
        } else {
            isTable = true;
            postFuc = cardSecretManagementList;
            splicingData = {
                ctype: postSearchData.value.ctype,
                page: pageNum.value,
                quantity: pageSize.value
            };
        }
    } else {
        // 标识查询
        postFuc = cardSecretManagementListSearchAll;
        splicingData = {
            s: postSearchData.value.s || ''
        }
    }

    postFuc({
        data: searchData,
        splicingData: splicingData,
    }).then((data) => {
        if (isTable) {
            total.value = data.page * pageSize.value;
        } else {
            total.value = 0;
        }
        tableData.value = (data.pageData || data || []).map(item => {
            if (item.CdKeyType) {
                item.CdKeyTypeStr = item.CdKeyType == 'vip' ? '会员' : '积分';
            }
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
    // searchData.ctype = "vip";
    // searchData.s = "";
    postSearchData.value = searchData;
    getData(true);

};

const onSubmit = () => {
    validate()
        .then((value) => {
            postSearchData.value = searchData;
            getData(true);
        })
        .catch((err) => {
            console.log("error", err);
        });
};

</script>

