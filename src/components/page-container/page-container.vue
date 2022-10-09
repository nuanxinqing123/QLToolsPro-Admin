<!--
 * @Descripttion: 页面组件
 * @Author: LiLei
 * @Date: 2022-10-05 17:14:08
 * @LastEditors: LiLei
 * @LastEditTime: 2022-10-09 18:20:13
-->
<template>
    <div :style="{height:routerPageHeight+'px'}"
         class="pc-page flex flex-column"
         :class="[(isScroll || isMobile)?'overflow-scroll':'',isCenter?'align-center':'',siteSettings.web_bg?'pc-page-bg':'']">
        <!-- {{routerPageHeight}}
        {{tableHeight}} -->
        <div class="pc-page-search"
             :class="isMobile?'mobile-search':''"
             v-if="isSearch">
            <slot name="search"></slot>
        </div>
        <slot name="top"
              :height="routerPageHeight"></slot>
        <!-- 表格 -->
        <div class="flex-base flex flex-column"
             v-if="isTable">
            <div class="flex-base"
                 :class="(isNoYScroll || isMobile)?'':'table-list-container'"
                 ref="tableRef">
                <a-table :columns="columnsTable"
                         :showHeader="!isMobile"
                         v-if="isNoYScroll || tableHeight"
                         :data-source="dataSource"
                         :row-selection="isRowSelection?rowSelection:null"
                         :pagination="false"
                         class="table-list"
                         :scroll="{  x: isMobile?null:500 ,y:(isMobile || isNoYScroll)?null:tableHeight - 55}">
                    <template #bodyCell="{ text, record, index, column }">
                        <template v-if="column.customAllKey === 'allData' && isMobile">
                            <div class="td-all-data">
                                <div v-html="text">
                                </div>
                                <slot name="bodyCell"
                                      :text="text"
                                      :record="record"
                                      :index="index"
                                      :column="column"></slot>
                            </div>

                        </template>
                        <slot name="bodyCell"
                              :text="text"
                              v-if="!isMobile"
                              :record="record"
                              :index="index"
                              :column="column"></slot>
                    </template>
                    <template #emptyText
                              :style="{'height':tableHeight - 110 +'px'}">
                        <div class="table-empty flex align-items"
                             :style="{'height':tableHeight - 110 +'px'}">
                            <a-empty :image="simpleImage" />
                        </div>

                    </template>
                </a-table>
            </div>
            <div class="flex content-between align-center table-pagination"
                 v-if="!isNoPagination"
                 :class="total?'':'visibility-view'">
                <div v-if="total">
                    共{{total || 0}}条记录
                </div>
                <a-pagination show-size-changer
                              v-if="total"
                              show-quick-jumper
                              v-model:current="pageNum"
                              v-model:pageSize="pageSize"
                              :total="total"
                              @change="paginationchange"
                              @showSizeChange="onShowSizeChange" />
            </div>
        </div>
        <slot name="bottom"></slot>
    </div>
</template>

<script setup>
import { reactive, toRaw, ref, onMounted, toRefs, watch } from "vue";
import { Empty } from "ant-design-vue";
// 分页数量
// const pageSize = ref(10);
// 空图片
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
import {
    storeToRefs
} from 'pinia';
import {
    commonUtil
} from '@/utils/store';
// 生成响应式
const {
    siteSettings,
    isMobile,
    routerPageHeight
} = storeToRefs(commonUtil);


const props = defineProps({
    columns: Array,
    dataSource: Array,
    isTable: Boolean,
    isNoYScroll: Boolean,
    total: [Number, String],
    pageNum: [Number, String],
    pageSize: [Number, String],
    isSearch: Boolean,
    isScroll: Boolean,
    isCenter: Boolean,
    isRowSelection: Boolean,
    isNoPagination: Boolean,
    rowSelection: Object,
});

const {
    isNoPagination,
    pageSize,
    isNoYScroll,
    isCenter,
    isScroll,
    total,
    pageNum,
    columns,
    dataSource,
    isTable,
    isSearch
} = toRefs(props);

const emit = defineEmits(['update:current', 'update:pageSize', 'update:total']);
const columnsTable = ref([]);
// 表格ref
const tableRef = ref(null);
// 列表高度
const tableHeight = ref(0);
// 定义 watch 监听
watch(
    dataSource,
    (newCount, old, clear) => {
        // 如果 watch 监听被重复执行了，则会先清除上次未完成的异步任务
        if (isTable.value) {
            init();
        }
    }
    // watch 刚被创建的时候不执行
    // { lazy: true }
);
// 判断手机还是pc
onMounted(() => {
    // 计算容器高度，需要减去15的头部高度
    setTimeout(() => {
        try {
            if (!isNoYScroll.value) {
                tableHeight.value = tableRef.value.clientHeight || tableRef.value.$el.clientHeight;
            }
        } catch (error) {

        }
        // 初始化数据
        if (isTable.value) {
            init();
        }
        // 回调数据
        emit('initData');
    }, 0);

    // 监听屏幕变化
    window.addEventListener("resize", () => {
        setTimeout(() => {
            if (isTable.value) {
                init();
            }
            if (isTable.value && !isNoYScroll.value) {
                tableHeight.value = tableRef.value.clientHeight || tableRef.value.$el.clientHeight;
                console.log("tableHeight.value3 ", tableHeight.value, tableRef.value.clientHeight)
            }
        }, 10);
    })
})
// 初始化数据
const init = () => {
    if (isMobile.value) {
        // columnsTable.value = columns.value.map(item => {
        //     let returnItem = {};
        //     for (let key in item) {
        //         if (key !== 'fixed') {
        //             returnItem[key] = item[key];
        //         }
        //     }
        //     return returnItem;
        // });
        columnsTable.value = [{
            title: "所有",
            dataIndex: "allData",
            customAllKey: "allData",
            customKey: "operation",
        }];
        if (dataSource.value.length) {
            dataSource.value = dataSource.value.map(item => {
                let allDataStr = '';

                for (let key in item) {
                    const kekObj = columns.value.filter(it => it.dataIndex == key)[0] || null;
                    if (kekObj) {
                        // if (allDataStr) {
                        //     allDataStr += "<br/>"
                        // }
                        // console.log("kekObj", kekObj)
                        allDataStr += "<p class='word-break table-alldata-list'>" + kekObj.title + "：" + item[key] + "</p>";
                    }
                }
                item.allData = allDataStr;
                return item;
            })
        }


    } else {
        columnsTable.value = columns.value;
    }
}

// 分页回调
const paginationchange = (page, pageSize) => {
    emit('update:current', page);
    emit('update:pageSize', pageSize);
    // 回调数据
    emit('onShowSizeChange');
    console.log("page, pageSize", page, pageSize)
};
// 分页回调
const onShowSizeChange = (e) => {
    console.log("eee", e);
};
</script>

<style lang="scss">
.pc-page {
    padding: 24px;
    // background: #fff;
    /* 设置滚动条的样式 */

    .table-pagination {
        margin-top: 15px;
        height: 32px;
    }
    .td-all-data {
        border-bottom: 1px dashed #ddd;
        margin-bottom: 10px;
        .table-alldata-list {
            margin-bottom: 10px;
        }
    }
    // .ant-table-thead {
    //     height: 45px;
    //     > tr > th {
    //         padding-top: 0;
    //         padding-bottom: 0;
    //         background-color: #eff3f7;
    //     }
    //     > tr
    //         > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
    //         display: none;
    //     }
    // }
    .pc-page-search {
        width: 100%;
        // background: #ffffff;
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
        &.mobile-search {
            .ant-btn {
                margin-bottom: 15px;
            }
        }
    }
    .table-list-container {
        position: relative;
        .table-list {
            position: absolute;
            left: 0;
            top: 0;
        }
    }
    &.pc-page-bg {
        ::-webkit-scrollbar {
            width: 18px;
        }

        // 滚动槽

        ::-webkit-scrollbar-track {
            @include hasBgbar();
            // border-radius: 10px;
        }

        // 滚动条滑块

        ::-webkit-scrollbar-thumb {
            // border-radius: 10px;
            @include hasBgbar();
            @include hasBgbarActive();
        }

        ::-webkit-scrollbar-thumb:window-inactive {
            @include hasBgbar();
        }

        .pc-page-search {
            background: rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(15px) brightness(110%);
        }
        .ant-table {
            background: rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(15px) brightness(110%);

            border-radius: 6px;

            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.17);
            .ant-table-cell-scrollbar {
                box-shadow: none;
            }
            .ant-table-cell {
                background: rgba(255, 255, 255, 0.3);
                border-bottom-color: transparent;
                // color: #ffffff;
            }

            // ant-table-cell ant-table-cell-fix-right ant-table-cell-fix-right-first
            // .ant-table-cell-fix-right-first {
            //     background: rgba(255, 255, 255, 1);
            //     z-index: 99999;
            // }
            // .ant-table-cell-scrollbar {
            //     @include hasBgbar();
            // }
        }
        .table-pagination {
            padding: 24px 12px;
            border-radius: 6px;
            background: rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(15px) brightness(110%);
            .ant-pagination-item-link,
            .ant-pagination-item-active,
            .ant-select-selector {
                background-color: transparent;
            }
        }
        // 容器管理
        .ant-card {
            background-color: transparent;
            @include hasBg();
            margin-bottom: 10px;
        }
        .form-container-item {
            background-color: red;
            margin-bottom: 10px;
            .ant-card {
                background: transparent;
                backdrop-filter: none;
            }
            @include hasBg();
        }
        .page-overview {
            .ant-descriptions {
                // border-radius: 6px;
                // padding: 20px;
                @include hasBg();
                // margin-bottom: 20px;
            }
        }
    }
}
</style>
