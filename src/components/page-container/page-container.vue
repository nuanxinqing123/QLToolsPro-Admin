<!--
 * @Descripttion: 页面组件
 * @Author: LiLei
 * @Date: 2022-10-05 17:14:08
 * @LastEditors: LiLei
 * @LastEditTime: 2022-10-09 12:48:01
-->
<template>
    <div :style="{height:routerPageHeight+'px'}"
         class="pc-page flex flex-column"
         :class="[isScroll?'overflow-scroll':'',isCenter?'align-center':'']">
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
                 :class="isNoYScroll?'':'table-list-container'"
                 ref="tableRef">
                <a-table :columns="columnsTable"
                         v-if="isNoYScroll || tableHeight"
                         :data-source="dataSource"
                         :row-selection="isRowSelection?rowSelection:null"
                         :pagination="false"
                         class="table-list"
                         :scroll="{  x: 500 ,y:isNoYScroll?null:tableHeight - 55}">
                    <template #bodyCell="{ text, record, index, column }">
                        <slot name="bodyCell"
                              :text="text"
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
                 v-if="!isNoPagination">
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
import { reactive, toRaw, ref, onMounted, toRefs } from "vue";
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
        columnsTable.value = columns.value.map(item => {
            let returnItem = {};
            for (let key in item) {
                if (key !== 'fixed') {
                    returnItem[key] = item[key];
                }
            }
            return returnItem;
        });

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

    .table-pagination {
        margin-top: 15px;
        height: 32px;
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
}
</style>
