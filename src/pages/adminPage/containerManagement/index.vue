<!--
 * @Descripttion: 容器管理
 * @Author: LiLei
 * @Date: 2022-10-05 17:14:08
 * @LastEditors: LiLei
 * @LastEditTime: 2022-12-14 19:41:15
-->
<template>
    <restore-pop v-model:visible="isPop"
                 :dataObj="popData">
    </restore-pop>
    <page-container isScroll
                    isNoYScroll
                    isTable
                    isNoPagination
                    :columns="columns"
                    @initData="getErrorList"
                    :dataSource="tableData">

        <template #top>
            <div class="flex form-container">
                <div class="flex-base form-container-item">
                    <a-card title="迁移/复制"
                            :bordered="false">
                        <p>Tip: 迁移/复制功能需要至少添加两个面板地址才能正常使用</p>
                        <p>迁移: 将A面板的所有变量迁移到B面板, 迁移完成后会清空A面板变量
                            <!-- <a-button type="link"
                                      class="cursor-initial"
                                      danger>【迁移功能可能受到青龙的限流限制,强烈推荐使用备份功能先备份数据。然后再使用迁移功能（避免数据丢失）】</a-button> -->
                        </p>
                        <p>复制: 将A面板的所有变量复制到B面板, 复制完成后A面板变量不会变化</p>
                    </a-card>

                    <a-form :model="formState1"
                            v-bind="layout1">
                        <a-row>
                            <a-col :span="11">

                                <a-form-item label="面板A:"
                                             name="start">
                                    <a-select v-model:value="formState1.start"
                                              placeholder="请选择"
                                              :filter-option="filterOption"
                                              show-search
                                              option-label-prop="label"
                                              :options="serverData">
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :span="11">
                                <a-form-item label="面板B:"
                                             name="end">
                                    <a-select v-model:value="formState1.end"
                                              placeholder="请选择"
                                              :filter-option="filterOption"
                                              show-search
                                              option-label-prop="label"
                                              :options="serverData">
                                    </a-select>
                                </a-form-item>
                            </a-col>
                        </a-row>

                        <a-divider />

                        <a-form-item :wrapper-col="{ span: 20, offset: 2 }"
                                     class="form-buttom flex">
                            <a-button type="primary"
                                      style="margin-right:20px;"
                                      class="flex-base"
                                      @click="transferFuc">迁移</a-button>
                            <a-button type="primary"
                                      class="flex-base"
                                      style="width:150px;"
                                      @click="copyFuc">复制</a-button>
                        </a-form-item>
                    </a-form>
                    <!-- <a-divider /> -->
                </div>
                <div class="flex-base form-right form-container-item">
                    <a-card title="备份/恢复"
                            :bordered="false">
                        <p>Tip: 备份/恢复功能将会以JSON文件实现</p>
                        <p>备份: 备份完成后会自动下载备份文件，下载完成十秒后。服务器自动删除服务端备份数据</p>

                        <!-- <p>恢复: 恢复文件的文件名必须为<a-button type="link"
                                      class="cursor-initial"
                                      danger>【backup.json】</a-button>
                        </p> -->
                    </a-card>

                    <a-form :model="formState2"
                            v-bind="layout2">
                        <a-form-item label="操作面板:"
                                     style="margin-top:46px;"
                                     name="start">
                            <a-select v-model:value="formState2.start"
                                      placeholder="请选择"
                                      :filter-option="filterOption"
                                      show-search
                                      option-label-prop="label"
                                      :options="serverData">
                            </a-select>
                        </a-form-item>

                        <a-divider />

                        <a-form-item :wrapper-col="{ span: 20, offset: 2 }"
                                     class="form-buttom">
                            <a-button type="primary"
                                      class="flex-base"
                                      style="margin-right:20px;"
                                      @click="backupFuc">备份</a-button>
                            <a-button type="primary"
                                      class="flex-base"
                                      @click="setPop">恢复</a-button>
                        </a-form-item>
                    </a-form>
                    <!-- <a-divider /> -->
                </div>
            </div>
            <a-card title="config.sh 同步"
                    :bordered="false">
                <a-row :gutter="16">
                    <a-col :span="5">

                        <a-form-item label="面板A:"
                                     name="start">
                            <a-select v-model:value="synchronizationForm.start"
                                      placeholder="请选择"
                                      :filter-option="filterOption"
                                      show-search
                                      @change="synchronizationChangeA"
                                      option-label-prop="label"
                                      :options="synchronizationA">
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="13">
                        <a-form-item label="面板B:"
                                     name="end">
                            <a-select v-model:value="synchronizationForm.end"
                                      placeholder="请选择"
                                      :max-tag-count="maxTagCount"
                                      :filter-option="filterOption"
                                      show-search
                                      mode="multiple"
                                      option-label-prop="label"
                                      :options="synchronizationB">
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-button type="primary"
                                  style="width:100%;"
                                  @click="synchronizationSubmit">同步</a-button>
                    </a-col>
                </a-row>

            </a-card>
            <a-card title="面板备份"
                    :bordered="false">
                <a-row :gutter="16">
                    <a-col :span="8">

                        <a-form-item label="面板:"
                                     name="panel_id">
                            <a-select v-model:value="panelBackupState.panel_id"
                                      placeholder="请选择"
                                      mode="multiple"
                                      :filter-option="filterOption"
                                      show-search
                                      option-label-prop="label"
                                      :options="panelBackupData">
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="7">
                        <a-form-item label="cron表达式:"
                                     name="cron">
                            <a-input v-model:value="panelBackupState.cron"
                                     placeholder="请输入cron表达式（仅支持标准5位）">
                                <template #addonAfter>
                                    <a href="https://zh.wikipedia.org/wiki/Cron"
                                       title="参考"
                                       target="_blank">?</a>
                                </template>
                            </a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="3">
                        <a-form-item label="启用状态:"
                                     name="state">
                            <a-switch v-model:checked="panelBackupState.state"
                                      checked-children="启用"
                                      un-checked-children="禁用" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-button type="primary"
                                  style="width:100%;"
                                  @click="panelBackupSubmit">提交</a-button>
                    </a-col>
                </a-row>

            </a-card>
            <a-card title="错误日志"
                    :bordered="false">
                <p>Tip: 错误日志会显示以上功能执行时发生的错误记录（只显示最新的十条记录）</p>

            </a-card>

        </template>
    </page-container>

</template>

<script setup>
import { ref, reactive, toRefs, watch } from 'vue';
import pageContainer from "@/components/page-container/page-container.vue";
import { message } from "ant-design-vue";
import restorePop from "./restorePop.vue";

import {
    panelManagementBackup,
    panelManagementSimple,
    synchronizationPost,
    panelManagementList,
    containerManagementBackUpDownload,
    containerManagementTransfer, containerManagementCopy, containerManagementBackup, containerManagementErrorList
} from "utils/api.js";

// 面板备份

const panelBackupState = reactive({
    panel_id: [],
    cron: '',
    state: true
})
const panelBackupData = ref([]);
const formState1 = reactive({
    start: "",
    end: ""
})
const formState2 = reactive({
    type: '1',
})
const serverData = ref([]);
const filterOption = (value, option) => {
    return option.label.indexOf(value) >= 0;
};
const maxTagCount = ref(3);
// configsh同步
const synchronizationForm = reactive({
    start: undefined,
    end: []
})
const synchronizationA = ref([]);
const synchronizationB = ref([]);
const layout1 = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 16,
    },
};
const layout2 = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 18,
    },
};

const columns = [

    {
        title: "发生时间",
        dataIndex: "UserID",
    },
    {
        title: "任务名称",
        dataIndex: "Username",
    },
    {
        title: "错误记录",
        dataIndex: "UserWxpusher",
    },
];
const tableData = ref([]);
const popData = ref({});
const isPop = ref(false);
// 同步config.sh
const synchronizationChangeA = (e) => {
    synchronizationB.value = serverData.value.filter(item => item.value !== e);
    if (synchronizationForm.end.includes(e)) {
        synchronizationForm.end = synchronizationForm.end.filter(item => item != e);
    }
}
// 同步数据
const synchronizationSubmit = () => {


    if (!synchronizationForm.start) {
        message.error("请选择面板A!");
        return;
    }
    if (!synchronizationForm.end.length) {
        message.error("请选择面板B!");
        return;
    }
    synchronizationPost({
        data: synchronizationForm
    }).then(() => {
        synchronizationForm.start = undefined;
        synchronizationForm.end = [];
    })
}
// 是否打开弹窗
const setPop = () => {
    isPop.value = true;
    popData.value = formState2;
}
// 迁移
const transferFuc = () => {
    containerManagementTransfer({
        data: formState1
    }).then(() => {
        message.success("操作已进入任务队列, 请稍后前往青龙面板查看结果!");
    });
}
// 复制
const copyFuc = () => {
    containerManagementCopy({
        data: formState1
    }).then(() => {
        message.success("操作已进入任务队列, 请稍后前往青龙面板查看结果!");
    });
}
// 备份
const backupFuc = () => {
    containerManagementBackup({
        data: formState2
    }).then(() => {
        message.success("操作已进入任务队列, 完成后将自动下载备份文件!");
        containerManagementBackUpDownload();
    });
}

// 获取面板信息
const pageGetPanelData = () => {
    panelManagementList({
        data: {},
        splicingData: {
            page: 1,
            quantity: 100
        },
    }).then((data) => {
        serverData.value = data.pageData.map(item => {
            return {
                label: item.PanelName,
                value: item.ID,
                envData: item.env_data
            }
        });
        formState1.start = serverData.value[0].value;
        formState2.start = serverData.value[0].value;
        try {
            formState1.end = serverData.value[1].value;
        } catch (error) {
            formState1.end = serverData.value[0].value;
        }

        // 同步的数据
        synchronizationA.value = serverData.value;
        synchronizationB.value = serverData.value;
    })


    // getPanelData({}).then((data) => {
    //     serverData.value = data.online.map(item => {
    //         return {
    //             label: item.PanelName,
    //             value: item.id,
    //             envData: item.env_data
    //         }
    //     });
    //     formState1.start = serverData.value[0].value;
    //     formState2.start = serverData.value[0].value;
    //     try {
    //         formState1.end = serverData.value[1].value;
    //     } catch (error) {
    //         formState1.end = serverData.value[0].value;
    //     }

    // })
}

const getErrorList = () => {
    containerManagementErrorList().then((data) => {
        tableData.value = data || [];
    })
}

// 面板备份提交
const panelBackupSubmit = () => {
    if (!panelBackupState.panel_id.length) {
        message.error("请选择面板!");
        return;
    }
    if (!panelBackupState.cron) {
        message.error("请输入cron表达式!");
        return;
    }
    panelManagementBackup({
        data: panelBackupState
    });
}

// 初始化
const init = () => {
    panelManagementSimple().then(data => {
        panelBackupData.value = (data || []).map(item => {
            return {
                label: item.name,
                value: item.id
            }
        })
    });
    // 获取错误日志
    pageGetPanelData();
}
init();
</script>

<style lang="scss">
.form-right {
    border-left: 1px dashed #ddd;
}
.form-container-item {
    padding-bottom: 20px;
    .ant-form-item-control-input-content {
        display: flex;
    }
    .form-buttom {
        margin-top: 24px;
    }
}
@media screen and (max-width: 1440px) {
    .form-container {
        display: block;
        .form-container-item {
            flex: initial;
            width: 100%;
            &.form-right {
                border-left: none;
            }
        }
    }
}
</style>
