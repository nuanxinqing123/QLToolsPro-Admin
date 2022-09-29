<!--
 * @Descripttion: 用户管理
 * @Author: LiLei
 * @Date: 2022-07-13 16:10:45
 * @LastEditors: LiLei
 * @Las tEditTime: 2022-07-13 16:17:03
-->
<template>
    <div class="report-page flex flex-column">
        <pop v-model:visible="isPop"
             :dataObj="popData"
             @updateData="getData">
        </pop>
        <div class="report-container search-container">
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
        </div>
        <div class="report-container flex-base flex flex-column">
            <div class="list-container-all flex-base flex flex-column">
                <div class="list-container flex-base">
                    <a-table :columns="columns"
                             :row-selection="rowSelection"
                             :data-source="tableData"
                             :pagination="false"
                             :scroll="{  x: 100 ,y:listHeight}">

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
import pop from "./pop.vue";

import { reactive, toRaw, ref, onMounted, computed, unref } from "vue";
import { Form, Empty, message } from "ant-design-vue";
import countAnimation from "@/components/count-animation/count-animation.vue";
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
        page: pageNum.value
    }
    messagePushManagementList({
        data: searchData,
        splicingData: splicingData,
    }).then((data) => {
        if (!isSearchData.value) {
            total.value = data.page * 20;
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
    getData();

});
// 监听宽度
const widthProcessing = () => {
    // 获取屏幕高度
    let winWidth = window.innerWidth || document.body.clientWidth;

    if (winWidth < 575) {
        listHeight.value = 300;
    } else {
        setTimeout(() => {
            try {
                listHeight.value = document.getElementsByClassName("list-container")[0].clientHeight - 30;

            } catch (error) {
                console.log("errorerrorerror", error, document.getElementsByClassName("list-container")[0])
            }
        }, 1000);
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
