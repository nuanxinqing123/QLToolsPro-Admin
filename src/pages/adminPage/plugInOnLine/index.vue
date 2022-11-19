<!--
 * @Descripttion: 在线插件库
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
                <a-form-item label="类型:"
                             name="type">
                    <a-select v-model:value="searchData.type"
                              placeholder="请选择"
                              style="width: 200px"
                              :options="options"></a-select>
                </a-form-item>

                <a-form-item>
                    <a-button type="primary"
                              @click.prevent="onSubmit()"
                              class="filter-search">
                        <SearchOutlined />
                        搜索
                    </a-button>
                    <!-- <a-button type="primary"
                              style="margin-left: 10px;"
                              shape="round"
                              @click.prevent="plugUpdate()">
                        刷新定时插件
                    </a-button>
                    <a-button type="primary"
                              style="margin-left: 10px;"
                              shape="round"
                              @click.prevent="setPop()">
                        上传插件
                    </a-button> -->
                    <!-- <a-button style="margin-left: 10px"
                              class="filter-reset"
                              @click="resetFieldsClick">
                        <SyncOutlined />重置
                    </a-button> -->
                </a-form-item>
            </a-form>
        </template>
        <template #bodyCell="{ text, record, index, column }">

            <template v-if="column.customKey === 'operation'">

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
    plugInManagementRefresh,
    plugInManagementDelete,
    plugInManagementOnLineList,
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
    type: "ordinary",
});
const isSearchData = ref(false);
const { resetFields, validate, validateInfos } = useForm(searchData);
const options = ref([
    {
        value: "ordinary",
        label: "普通"
    },
    {
        value: "cron",
        label: "定时"
    }, {
        value: "front",
        label: "前置"
    }
])
const columns = [
    {
        title: "文件名称",
        dataIndex: "FileName",
    },
    {
        title: "插件名称",
        dataIndex: "Name",
    },
    {
        title: "版本",
        dataIndex: "Version",
    },
    {
        title: "上传人",
        dataIndex: "Author",
    },
    {
        title: "更新日期",
        dataIndex: "Time",
    },
    // {
    //     title: "操作",
    //     dataIndex: "operation",
    //     customKey: "operation",
    // }
];
const tableData = ref([

]);
// 是否打开弹窗
const setPop = (item) => {
    isPop.value = true;

}
// 删除插件

const plugUpdate = (item) => {
    plugInManagementRefresh().then(() => {
        message.success("刷新成功!");
        getData(true);
    })
}

// 删除
const deletRow = (item) => {
    plugInManagementDelete({
        data: {
            type: postSearchData.value.type,
            file_name: item.file_name
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
        // page: pageNum.value,
        // quantity: pageSize.value,
        type: postSearchData.value.type
    };
    // axios.get('http://plugin.6b7.xyz/v1/api/plugin/data?page=1&quantity=10&type=ordinary')
    plugInManagementOnLineList({
        data: searchData,
        splicingData: splicingData,
    }).then((data) => {
        try {
            total.value = (data.page || 0) * pageSize.value;
        } catch (error) {
            total.value = 0;
        }


        tableData.value = (data || []).map(item => {
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
            postSearchData.value = searchData;
            getData(true);
        })
        .catch((err) => {
            console.log("error", err);
        });
};
postSearchData.value = searchData;

</script>

