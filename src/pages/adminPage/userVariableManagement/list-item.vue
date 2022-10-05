<!--
 * @Descripttion: Descripttion
 * @Author: LiLei
 * @Date: 2022-10-05 19:18:55
 * @LastEditors: LiLei
 * @LastEditTime: 2022-10-05 19:51:00
-->
<template>
    <a-table :dataSource="list"
             :pagination="false"
             class="list-tabtle"
             :scroll="{y:300}"
             :bordered="false"
             :columns="columns">
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
    </a-table>
    <!-- <a-list :data-source="list"
            class="list-items"
            bordered>
        <template #header>
            <span>Header</span>
            <span>Header</span>
            <span>Header</span>
        </template>
        <template #renderItem="{ item }">
            <a-list-item>
                <template #actions>
                    <div>删除</div>
                </template>
                <div class="word-break item-name">{{ item.name }}</div>
                <div class="word-break">{{ item.value }}</div>
            </a-list-item>
        </template>
    </a-list> -->
</template>
<script>
import { defineComponent, onMounted, ref, nextTick, toRefs } from 'vue';
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
export default defineComponent({
    props: {
        data: Array
    },
    setup (props) {
        const columns = [
            {
                title: '变量名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '变量值',
                dataIndex: 'value',
                key: 'value',
            },
            {
                title: "操作",
                dataIndex: "operation",
                customKey: "operation",
            }
        ]
        const { data } = toRefs(props);
        const initLoading = ref(false);
        const loading = ref(false);
        const list = ref([]);
        list.value = data.value.panel_env;
        return {
            columns,
            loading,
            initLoading,
            list,
        };
    },

});
</script>
<style lang="scss">
// .list-tabtle {
//     padding: 30px;
// }
.list-items {
    max-height: 300px;
    overflow-y: scroll;
    .item-name {
        width: 180px;
    }
}
</style>
