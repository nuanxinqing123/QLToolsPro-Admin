<!--
 * @Descripttion: 上传记录
 * @Author: LiLei
 * @Date: 2022-07-13 16:10:45
 * @LastEditors: LiLei
 * @Las tEditTime: 2022-07-13 16:17:03
-->
<template>
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

    </page-container>

</template>

<script setup>
import { reactive, toRaw, ref, onMounted } from "vue";
import { Form, Empty, message } from "ant-design-vue";
import pageContainer from "@/components/page-container/page-container.vue";
import {
    uploadDataList,
    uploadDataListSearch,
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

const columns = ref([{
    "title": "序号",
    "dataIndex": "ID",
}, {
    "title": "上传变量名",
    "dataIndex": "RecordEnvName",
}, {
    "title": "消费方式",
    "dataIndex": "RecordTypeStr",
}, {
    "title": "上传用户ID",
    "dataIndex": "RecordUserID",
}, {
    "title": "创建时间",
    "dataIndex": "CreatedAt",
}, {
    "title": "更新时间",
    "dataIndex": "UpdatedAt",
}]);
const tableData = ref([

]);

const getData = (flag) => {
    if (flag) {
        pageNum.value = 1;
    }
    let splicingData = {}, postFuc
    if (isSearchData.value) {
        postFuc = uploadDataListSearch
        splicingData = searchData
    } else {
        postFuc = uploadDataList
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
            if (item.RecordType) {
                item.RecordTypeStr = item.RecordType == 1 ? '积分' : '会员';
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

