<!--
 * @Descripttion: 插件管理
 * @Author: LiLei
 * @Date: 2022-07-13 16:10:45
 * @LastEditors: LiLei
 * @Las tEditTime: 2022-07-13 16:17:03
-->
<template>
    <div class="report-page flex flex-column">
        <edit-or-add v-model:visible="isPop"
                     @updateData="getData(true)"
                     :dataObj="popData">
        </edit-or-add>
        <div class="report-container search-container">
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
                    <a-button type="primary"
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
                    </a-button>
                    <!-- <a-button style="margin-left: 10px"
                              class="filter-reset"
                              @click="resetFieldsClick">
                        <SyncOutlined />重置
                    </a-button> -->
                </a-form-item>
            </a-form>
        </div>
        <div class="report-container flex-base flex flex-column">
            <div class="list-container-all flex-base flex flex-column">
                <div class="list-container flex-base">
                    <a-table :columns="columns"
                             :data-source="tableData"
                             :pagination="false"
                             :scroll="{  x: 100 ,y:listHeight}">
                        <template #bodyCell="{ text, record, index, column }">
                            <template v-if="column.customKey === 'money'">
                                <count-animation :num="text"></count-animation>
                            </template>
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
                        <template #emptyText
                                  style="{height:'500px'"
                                  }>
                            <div class="table-empty flex align-items"
                                 :style="{'height':listHeight-50+'px'}">
                                <a-empty :image="simpleImage" />
                            </div>

                        </template>
                    </a-table>
                </div>
                <div class="flex content-between align-center"
                     v-if="total">
                    <div>
                        共{{total || 0}}条记录
                    </div>
                    <a-pagination show-size-changer
                                  show-quick-jumper
                                  v-model:current="pageNum"
                                  v-model:pageSize="pageSize"
                                  :total="total"
                                  @change="paginationchange"
                                  @showSizeChange="onShowSizeChange" />
                </div>

            </div>
        </div>

    </div>

</template>

<script setup>
import { reactive, toRaw, ref, onMounted } from "vue";
import editOrAdd from "./editOrAdd.vue";
import { Form, Empty, message } from "ant-design-vue";
import countAnimation from "@/components/count-animation/count-animation.vue";
import {
    plugInManagementRefresh,
    plugInManagementDelete,
    plugInManagementList,
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
    }
])
const columns = [
    {
        title: "文件名称",
        dataIndex: "file_name",
    },
    {
        title: "插件名称",
        dataIndex: "plugin_name",
    },
    {
        title: "定时时间",
        dataIndex: "cron_time",
    },
    {
        title: "容器名称",
        dataIndex: "need_env_name",
    },

    {
        title: "操作",
        dataIndex: "operation",
        customKey: "operation",
    }
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
        page: pageNum.value,
        type: postSearchData.value.type
    };

    plugInManagementList({
        data: searchData,
        splicingData: splicingData,
    }).then((data) => {
        // try {
        //     total.value = (data.page || 0) * 20;
        // } catch (error) {
        //     total.value = 0;
        // }


        tableData.value = (data || []).map(item => {
            if (item.CreatedAt) {
                item.CreatedAt = dateTtoDateStr(item.CreatedAt);
            }
            if (item.UpdatedAt) {
                item.UpdatedAt = dateTtoDateStr(item.UpdatedAt);
            }
        });
    });
}

// 获取高度
const listHeight = ref(100);
onMounted(() => {
    widthProcessing()
    // 监听屏幕变化
    window.addEventListener("resize", () => {
        // 获取屏幕高度
        widthProcessing();
    });
    postSearchData.value = searchData;
    getData();

});
// 监听宽度
const widthProcessing = () => {
    // 获取屏幕高度
    let winWidth = window.innerWidth || document.body.clientWidth;

    if (winWidth < 575) {
        listHeight.value = 300;
    } else {
        try {
            setTimeout(() => {
                try {
                    listHeight.value = document.getElementsByClassName("list-container")[0].clientHeight - 30;

                } catch (error) {
                    console.log("errorerrorerror", error, document.getElementsByClassName("list-container")[0])
                }
            }, 0);
        } catch (error) {

        }
    }
}
const resetFieldsClick = () => {
    resetFields();
    isSearchData.value = false;
    getData();

};
// 分页回调
const paginationchange = (page, pageSize) => {
    getData();
};
// 分页回调
const onShowSizeChange = (e) => {
    console.log("eee", e);
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

</script>

<style lang="scss">
.report-page {
    width: 100%;
    background: #f2f2f2;
    padding: 15px;
    height: 100vh;
    .ant-table-thead {
        height: 45px;
        > tr > th {
            padding-top: 0;
            padding-bottom: 0;
            background-color: #eff3f7;
        }
        > tr
            > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
            display: none;
        }
    }
    .list-container-all {
        margin-top: 15px;
    }
    .list-container {
        margin-bottom: 20px;
    }
}
.report-container {
    width: 100%;
    background: #ffffff;
    padding: 20px;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.17);
    border-radius: 6px;
    margin-bottom: 15px;
    // 筛选搜索
    .filter-search {
        background-color: #3fb3b0;
        border-radius: 25px;
        border-color: #3fb3b0;
        &:hover {
            opacity: 0.8;
        }
    }
    // 筛选重置
    .filter-reset {
        background-color: #f08a37;
        border-radius: 25px;
        border-color: #f08a37;
        color: #ffffff;
        &:hover {
            opacity: 0.8;
        }
    }
    // height: 120px;
}
.search-container {
    // height: 160px;
    // overflow: hidden;
    padding-bottom: 0;
    transition: all linear 0.3s;
    .ant-row.ant-form-item {
        margin-right: 20px;
        margin-bottom: 15px;

        @media screen and (max-width: 575px) {
            margin-right: 0;
            width: 100%;
        }
    }
}
</style>
