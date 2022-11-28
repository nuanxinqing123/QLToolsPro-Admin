<!--
 * @Descripttion: 用户管理
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
    <recharge-pop v-model:visible="isRechargePop"
                  type="3"
                  @updateData="getData(true)"
                  :dataObj="rechargePopData"></recharge-pop>

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
        <template #bodyCell="{ text, record, index, column }">
            <template v-if="column.customKey === 'operation'">
                <a-button type="primary"
                          @click.stop="setRechargePop(record)"
                          style="margin-bottom:10px;"
                          shape="round">充值
                </a-button>
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
import rechargePop from "@/components/recharge-pop/recharge-pop.vue";

import {
    userManagementDelete,
    userManagementList,
    userManagementListSearch,
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
        title: "用户UID",
        dataIndex: "UserID",
        // fixed: "left",
        width: 200
    },
    {
        title: "用户邮箱",
        dataIndex: "Email",
        // fixed: "left",
        width: 200
    },
    {
        title: "用户名",
        dataIndex: "Username",
        width: 200
    },
    // {
    //     title: "用户密码",
    //     dataIndex: "Password",
    //     width: 200
    // },
    {
        title: "用户积分",
        dataIndex: "Integral",
        width: 150
    },
    // {
    //     title: "VIP",
    //     dataIndex: "IsVIPStr",
    //     width: 100
    // },
    {
        title: "近期登录信息",
        dataIndex: "LoginIP",
        width: 280
    },
    {
        title: "会员到期时间",
        dataIndex: "ActivationTime",
        width: 200
    },
    {
        title: "管理员",
        dataIndex: "IsAdminStr",
        width: 120
    },
    {
        title: "用户WxpusherID",
        dataIndex: "UserWxpusher",
        width: 280
    },
    {
        title: "用户账户状态",
        dataIndex: "IsStateStr",
        width: 280
    },

    {
        title: "创建时间",
        dataIndex: "CreatedAt",
        width: 280
    },
    // {
    //     title: "更新时间",
    //     dataIndex: "UpdatedAt",
    //     width: 280
    // },
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
const isRechargePop = ref(false);
const rechargePopData = ref({});

const setRechargePop = (item) => {
    isRechargePop.value = true;
    rechargePopData.value = item;
}

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
    userManagementDelete({
        data: {
            id: item.ID
        }
    }).then(() => {
        message.success("操作成功!");
        resetFieldsClick();
    })
}

const getData = (flag) => {
    if (flag) {
        pageNum.value = 1;
    }
    let splicingData = {}, postFuc
    if (isSearchData.value) {
        postFuc = userManagementListSearch
        splicingData = searchData
    } else {
        postFuc = userManagementList
        splicingData = {
            page: pageNum.value,
            quantity: pageSize.value
        }
    }

    postFuc({
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
            item.IsStateStr = item.IsState ? '可用' : "禁用";
            item.IsVIPStr = item.IsVIP ? '是' : "否";
            if (item.ActivationTime) {
                item.ActivationTime = item.ActivationTime === "0001-01-01T00:00:00Z" ? '' : dateTtoDateStr(item.ActivationTime);
            }
            item.IsAdminStr = item.IsAdmin ? '✓' : "";
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

