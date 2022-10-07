<!--
 * @Descripttion: 面板管理
 * @Author: LiLei
 * @Date: 2022-07-13 16:10:45
 * @LastEditors: LiLei
 * @Las tEditTime: 2022-07-13 16:17:03
-->
<template>
    <edit-or-add v-model:visible="isPop"
                 @updateData="getData"
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
                        创建面板
                    </a-button>
                    <a-popconfirm placement="topLeft"
                                  ok-text="是"
                                  cancel-text="否"
                                  @confirm="unBind()">
                        <template #title>
                            是否确认解除？
                        </template>
                        <a-button type="primary"
                                  shape="round"
                                  style="margin-left: 10px">
                            解除所有变量绑定
                        </a-button>
                    </a-popconfirm>
                    <a-popconfirm placement="topLeft"
                                  ok-text="是"
                                  cancel-text="否"
                                  @confirm="tokenUpdate()">
                        <template #title>
                            是否确认更新？
                        </template>
                        <a-button type="primary"
                                  shape="round"
                                  style="margin-left: 10px">
                            批量更新Token
                        </a-button>
                    </a-popconfirm>
                </a-form-item>
            </a-form>
        </template>
        <template #bodyCell="{ text, record, index, column }">
            <template v-if="column.customKey === 'money'">
                <count-animation :num="text"></count-animation>
            </template>
            <template v-if="column.customKey === 'isHide'">
                <span>************</span>
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

                <a-button type="primary"
                          style="margin-left: 10px;margin-bottom:10px;"
                          shape="round">绑定变量
                </a-button>
                <a-button type="primary"
                          @click.stop="testLink(record)"
                          style="margin-left: 10px;margin-bottom:10px;"
                          shape="round">测试链接
                </a-button>
            </template>
        </template>
    </page-container>

</template>

<script setup>
import { reactive, toRaw, ref, onMounted, h } from "vue";
import editOrAdd from "./editOrAdd.vue";
import { Form, Empty, message, notification } from "ant-design-vue";
import pageContainer from "@/components/page-container/page-container.vue";

import countAnimation from "@/components/count-animation/count-animation.vue";
import {
    panelManagementList,
    panelManagementDelete,
    panelManagementConnect,
    panelManagementUnBinding,
    panelManagementTokenUpdate,
} from "@/utils/api";
import {
    dateTtoDateStr,
} from "@/utils/common";
import {
    SmileOutlined,
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
    invoiceSeq: "",
    userPhone: "",
    operationUser: "",
});
const { resetFields, validate, validateInfos } = useForm(searchData);

const columns = [
    {
        title: "面板ID",
        dataIndex: "ID",
        fixed: "left",
        width: 120
    },
    {
        title: "名称",
        dataIndex: "PanelName",
        fixed: "left",
        width: 200
    },
    {
        title: "连接地址",
        dataIndex: "PanelURL",
        fixed: "left",
        width: 200
    },
    {
        title: "Client_ID",
        dataIndex: "PanelClientID",
        customKey: "isHide",
        width: 200
    },
    {
        title: "Client_Secret",
        dataIndex: "PanelClientSecret",
        customKey: "isHide",
        width: 200
    },
    // {
    //     title: "Token",
    //     dataIndex: "PanelToken",
    //     width: 200
    // },
    // {
    //     title: "Params",
    //     dataIndex: "PanelParams",
    //     width: 200
    // },
    {
        title: "绑定变量",
        dataIndex: "EnvBinding",
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
            title: "面板编辑"
        };
    } else {
        popData.value = {
            title: "面板新增"
        };
    }
}

// 解除变量绑定
const unBind = () => {
    panelManagementUnBinding().then(() => {
        message.success("操作成功!");
        getData(true);
    })
}
// 批量更新token
const tokenUpdate = () => {
    panelManagementTokenUpdate().then(() => {
        message.success("操作成功!");
        getData(true);
    })
}
// 删除面板
const deletRow = (item) => {
    panelManagementDelete({
        data: {
            id: [item.ID]
        }
    }).then(() => {
        message.success("操作成功!");
        getData(true);
    })
}

// 测试链接
const testLink = (item) => {
    panelManagementConnect({
        data: {
            "name": item.PanelName,
            "url": item.PanelURL,
            "id": item.ID,
            "secret": item.PanelClientSecret,
        }
    }).then(() => {
        message.success("面板连接测试成功!");
    })
}
const getData = (flag) => {
    if (flag) {
        pageNum.value = 1;
    }

    panelManagementList({
        data: searchData,
        splicingData: {
            page: pageNum.value,
            quantity: pageSize.value
        },
    }).then((data) => {
        total.value = (data.pageData || []).length;
        tableData.value = (data.pageData || []).map(item => {
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
    getData();
};

const onSubmit = () => {
    validate()
        .then((value) => {
            console.log("value", value)
            getData();
        })
        .catch((err) => {
            console.log("error", err);
        });
};

/*const openNotification = () => {
    notification.open({
        message: '面板管理',
        icon: () => h(SmileOutlined, {
            style: 'color: #108ee9',
        }),
        description: h(`
        <p>面板管理可以添加自己的服务容器（青龙面板），用于分散提交的变量到不同的容器来缓解过于集中的压力。利于管理</p>
        <p>Tips：青龙Tools需要环境变量模块的权限，请开通此模块权限</p>
        <p>Tips：青龙面板版本低于2.11.x的用户请选择旧版本，2.11.x以及以上用户请选择新版本。默认新版本</p>
        `),
        duration: null,
        onClick: () => {
            console.log('Notification Clicked!');
        },
    });
};
openNotification();*/
</script>

