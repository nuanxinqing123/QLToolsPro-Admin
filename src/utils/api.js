/*
 * @Descripttion: 接口名称
 * @Author: LiLei
 * @Date: 2022-08-16 03:11:42
 * @LastEditors: LiLei
 * @LastEditTime: 2022-11-14 17:58:47
 */
import service from "./request";
import exportExcel from "./exportExcel";
import fetchRequest from "./fetchRequest";

// 网站配置获取接口
export function getSetting(opts) {
    let obj = opts || {};
    return service.request({
        method: "get",
        isForm: false,
        ifSplicing: true, //是否拼接
        splicingData: opts.splicingData || {}, //拼接的data

        url: import.meta.env.VITE_URl + "v2/api/user/settings",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}
// CDK检查接口
export function postCdk(opts) {
    let obj = opts || {};
    return service.request({
        method: "post",
        // isForm: true,
        url: import.meta.env.VITE_URl + "v3/api/check/cdk",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

// 面板信息获取接口
export function getPanelData(opts) {
    let obj = opts || {};
    return service.request({
        method: "get",
        isForm: false,
        ifSplicing: true, //是否拼接
        splicingData: opts.splicingData || {}, //拼接的data

        url: import.meta.env.VITE_URl + "v2/api/online/server",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

// 变量上传接口
export function uploadAdd(opts) {
    let obj = opts || {};
    return service.request({
        method: "post",
        // isForm: true,
        url: import.meta.env.VITE_URl + "v2/api/online/upload/data",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

/***************/
// 生成验证码

export function generateVerificationCode(opts) {
    let obj = opts || {};
    return service.request({
        method: "get",
        isForm: false,
        url: import.meta.env.VITE_URl + "v1/api/verification/code",
        data: obj.data || {},
        isLoadding: obj.isLoadding || false,
        isCloseLoadding: obj.isCloseLoadding || false,
        isPop: obj.isPop,
    });
}

// 注册
export function userRegister(opts) {
    let obj = opts || {};
    return service.request({
        method: "post",
        // isForm: true,
        url: import.meta.env.VITE_URl + "v1/api/user/signup",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

// 登录

export function userSignin(opts) {
    let obj = opts || {};
    return service.request({
        method: "post",
        url: import.meta.env.VITE_URl + "v1/api/user/signin",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: false,
    });
}
// 找回密码 - 发送验证码
export function userFindpwdCode(opts) {
    let obj = opts || {};
    return service.request({
        method: "post",
        url: import.meta.env.VITE_URl + "v1/api/findpwd/message",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}
// 找回密码 - 修改密码
export function userRepwd(opts) {
    let obj = opts || {};
    return service.request({
        method: "PUT",
        url: import.meta.env.VITE_URl + "v1/api/findpwd/repwd",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}
// 用户首页：用户信息获取
export function userSms(opts) {
    let obj = opts || {};
    return service.request({
        method: "get",
        isForm: false,
        url: import.meta.env.VITE_URl + "v2/api/user/data",
        data: obj.data || {},
        isLoadding: obj.isLoadding || false,
        isCloseLoadding: obj.isCloseLoadding || false,
        isPop: obj.isPop,
    });
}
// 管理员Token检查
export function checkToken(opts) {
    let obj = opts || {};
    return service.request({
        method: "post",
        url: import.meta.env.VITE_URl + "v1/api/check/token/admin",
        data: obj.data || {},
        isLoadding: obj.isLoadding || false,
        isCloseLoadding: obj.isCloseLoadding || false,
        isPop: obj.isPop,
    });
}

// 用户token检查
export function userCheckToken(opts) {
    let obj = opts || {};
    return service.request({
        method: "post",
        url: import.meta.env.VITE_URl + "v1/api/check/token",
        data: obj.data || {},
        isLoadding: obj.isLoadding || false,
        isCloseLoadding: obj.isCloseLoadding || false,
        isPop: obj.isPop,
    });
}
// 检查用户WxPusher订阅状态
export function wxpusherState(opts) {
    let obj = opts || {};
    return service.request({
        method: "get",
        isForm: false,
        url: import.meta.env.VITE_URl + "v2/api/user/wxpusher/state",
        data: obj.data || {},
        isLoadding: obj.isLoadding || false,
        isCloseLoadding: obj.isCloseLoadding || false,
        isPop: obj.isPop,
    });
}

// 获取WxPusher订阅二维码
export function wxpusherQrcode(opts) {
    let obj = opts || {};
    return service.request({
        method: "get",
        isForm: false,
        url: import.meta.env.VITE_URl + "v2/api/user/wxpusher/qrcode",
        data: obj.data || {},
        isLoadding: obj.isLoadding || false,
        isCloseLoadding: obj.isCloseLoadding || false,
        isPop: obj.isPop,
    });
}

// 更新用户WxPusherID
export function wxpusherUpdate(opts) {
    let obj = opts || {};
    return service.request({
        method: "put",
        isForm: false,
        ifSplicing: true, //是否拼接
        splicingData: opts.splicingData || {}, //拼接的data
        url: import.meta.env.VITE_URl + "v2/api/user/wxpusher/update",
        data: obj.data || {},
        isLoadding: obj.isLoadding || false,
        isCloseLoadding: obj.isCloseLoadding || false,
        isPop: obj.isPop,
    });
}
// 轮询订阅状态
export function wxpusherBindState(opts) {
    let obj = opts || {};
    return fetchRequest({
        method: "get",
        isForm: false,
        isPop: false,
        ifSplicing: true, //是否拼接
        splicingData: obj.splicingData || {}, //拼接的data
        url: "https://wxpusher.zjiecode.com/api/fun/scan-qrcode-uid",
        data: obj.data || {},
        isLoadding: obj.isLoadding || false,
        isCloseLoadding: obj.isCloseLoadding || false,
    });
}

// 积分充值
export function userIntegralRecharge(opts) {
    let obj = opts || {};
    return service.request({
        method: "post",
        isForm: false,
        isPop: false,
        url: import.meta.env.VITE_URl + "v2/api/user/recharge/integral",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}
// 会员充值
export function memberRecharge(opts) {
    let obj = opts || {};
    return service.request({
        method: "post",
        isForm: false,
        isPop: false,
        url: import.meta.env.VITE_URl + "v2/api/user/recharge/vip",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

// 充值记录

export function rechargeRecord(opts) {
    let obj = opts || {};
    return service.request({
        method: "get",
        isForm: false,
        ifSplicing: true, //是否拼接
        splicingData: opts.splicingData || {}, //拼接的data
        url: import.meta.env.VITE_URl + "v2/api/consumption/user/division/data",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

// 上传记录
export function uploadRecords(opts) {
    let obj = opts || {};
    return service.request({
        method: "get",
        isForm: false,
        ifSplicing: true, //是否拼接
        splicingData: opts.splicingData || {}, //拼接的data
        url: import.meta.env.VITE_URl + "v2/api/record/user/division/data",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

/****************************管理员*****************************/
// 首页数据
export function homeData(opts) {
    let obj = opts || {};
    return service.request({
        method: "get",
        isForm: false,
        url: import.meta.env.VITE_URl + "v3/api/index/data",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

/*******面板管理********/
// 列表
export function panelManagementList(opts) {
    let obj = opts || {};
    return service.request({
        method: "get",
        isForm: false,
        ifSplicing: true, //是否拼接
        splicingData: opts.splicingData || {}, //拼接的data
        url: import.meta.env.VITE_URl + "v3/api/panel/division/data",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}
// 新增
export function panelManagementAdd(opts) {
    let obj = opts || {};
    return service.request({
        method: "post",
        isForm: false,
        url: import.meta.env.VITE_URl + "v3/api/panel/add",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

// 编辑
export function panelManagementUpdate(opts) {
    let obj = opts || {};
    return service.request({
        method: "put",
        isForm: false,
        url: import.meta.env.VITE_URl + "v3/api/panel/update",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

// 删除
export function panelManagementDelete(opts) {
    let obj = opts || {};
    return service.request({
        method: "delete",
        isForm: false,
        url: import.meta.env.VITE_URl + "v3/api/panel/delete",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

// 测试链接
export function panelManagementConnect(opts) {
    let obj = opts || {};
    return service.request({
        method: "post",
        isForm: false,
        url: import.meta.env.VITE_URl + "v3/api/panel/test/connect",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

// 绑定变量
export function panelManagementBinding(opts) {
    let obj = opts || {};
    return service.request({
        method: "put",
        isForm: false,
        url: import.meta.env.VITE_URl + "v3/api/panel/binding/update",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

// 面板解除所有变量绑定

export function panelManagementUnBinding(opts) {
    let obj = opts || {};
    return service.request({
        method: "put",
        isForm: false,
        url: import.meta.env.VITE_URl + "v3/api/panel/unbind/update",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}
// 面板批量更新Token
export function panelManagementTokenUpdate(opts) {
    let obj = opts || {};
    return service.request({
        method: "put",
        isForm: false,
        url: import.meta.env.VITE_URl + "v3/api/panel/token/update",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}
/*******用户管理********/
// 列表
export function userManagementList(opts) {
    let obj = opts || {};
    return service.request({
        method: "get",
        isForm: false,
        ifSplicing: true, //是否拼接
        splicingData: opts.splicingData || {}, //拼接的data
        url: import.meta.env.VITE_URl + "v3/api/user/division/data",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}
// 列表-搜索
export function userManagementListSearch(opts) {
    let obj = opts || {};
    return service.request({
        method: "get",
        isForm: false,
        ifSplicing: true, //是否拼接
        splicingData: opts.splicingData || {}, //拼接的data
        url: import.meta.env.VITE_URl + "v3/api/user/search",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

// 删除
export function userManagementDelete(opts) {
    let obj = opts || {};
    return service.request({
        method: "DELETE",
        isForm: false,
        url: import.meta.env.VITE_URl + "v3/api/user/information/delete",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

// 修改
export function userManagementUpdate(opts) {
    let obj = opts || {};
    return service.request({
        method: "put",
        isForm: false,
        url: import.meta.env.VITE_URl + "v3/api/user/information/update",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}
/*******消息推送管理********/
export function messagePushManagementList(opts) {
    let obj = opts || {};
    return service.request({
        method: "get",
        isForm: false,
        ifSplicing: true, //是否拼接
        splicingData: opts.splicingData || {}, //拼接的data
        url: import.meta.env.VITE_URl + "v3/api/message/division/data",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}
// 消息群发
export function messagePushManagementMessageSend(opts) {
    let obj = opts || {};
    return service.request({
        method: "POST",
        isForm: false,
        url: import.meta.env.VITE_URl + "v3/api/message/send",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}
// 全体消息群发
export function messagePushManagementMessageAllSend(opts) {
    let obj = opts || {};
    return service.request({
        method: "POST",
        isForm: false,
        url: import.meta.env.VITE_URl + "v3/api/message/send/all",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}
/*******数据查询********/
// 充值数据
// 列表查询
export function rechargeDataList(opts) {
    let obj = opts || {};
    return service.request({
        method: "get",
        isForm: false,
        ifSplicing: true, //是否拼接
        splicingData: opts.splicingData || {}, //拼接的data
        url: import.meta.env.VITE_URl + "v3/api/recharge/division/data",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}
// 列表搜索查询
export function rechargeDataListSearch(opts) {
    let obj = opts || {};
    return service.request({
        method: "get",
        isForm: false,
        ifSplicing: true, //是否拼接
        splicingData: opts.splicingData || {}, //拼接的data
        url: import.meta.env.VITE_URl + "v3/api/recharge/search",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}
// 上传记录
// 列表查询
export function uploadDataList(opts) {
    let obj = opts || {};
    return service.request({
        method: "get",
        isForm: false,
        ifSplicing: true, //是否拼接
        splicingData: opts.splicingData || {}, //拼接的data
        url: import.meta.env.VITE_URl + "v3/api/record/division/data",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}
// 列表搜索查询
export function uploadDataListSearch(opts) {
    let obj = opts || {};
    return service.request({
        method: "get",
        isForm: false,
        ifSplicing: true, //是否拼接
        splicingData: opts.splicingData || {}, //拼接的data
        url: import.meta.env.VITE_URl + "v3/api/record/division/data",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

/*******变量管理********/
// 列表搜索查询
export function variableManagementList(opts) {
    let obj = opts || {};
    return service.request({
        method: "get",
        isForm: false,
        ifSplicing: true, //是否拼接
        splicingData: opts.splicingData || {}, //拼接的data
        url: import.meta.env.VITE_URl + "v3/api/env/division/data",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

// 新增
export function variableManagementAdd(opts) {
    let obj = opts || {};
    return service.request({
        method: "post",
        isForm: false,
        url: import.meta.env.VITE_URl + "v3/api/env/add",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

// 编辑
export function variableManagementUpdate(opts) {
    let obj = opts || {};
    return service.request({
        method: "put",
        isForm: false,
        url: import.meta.env.VITE_URl + "v3/api/env/update",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

// 删除
export function variableManagementDelete(opts) {
    let obj = opts || {};
    return service.request({
        method: "delete",
        isForm: false,
        url: import.meta.env.VITE_URl + "v3/api/env/delete",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}
/*******卡密管理********/

// 删除
export function cardSecretManagementDelete(opts) {
    let obj = opts || {};
    return service.request({
        method: "delete",
        isForm: false,
        url: import.meta.env.VITE_URl + "v3/api/cd-key/delete",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

// 编辑
export function cardSecretManagementUpdate(opts) {
    let obj = opts || {};
    return service.request({
        method: "post",
        isForm: false,
        url: import.meta.env.VITE_URl + "v3/api/cd-key/batch/update",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

// 列表
export function cardSecretManagementList(opts) {
    let obj = opts || {};
    return service.request({
        method: "get",
        isForm: false,
        ifSplicing: true, //是否拼接
        splicingData: opts.splicingData || {}, //拼接的data
        url: import.meta.env.VITE_URl + "v3/api/cd-key/division/data",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

// 列表-筛选查询
export function cardSecretManagementListSearch(opts) {
    let obj = opts || {};
    return service.request({
        method: "get",
        isForm: false,
        ifSplicing: true, //是否拼接
        splicingData: opts.splicingData || {}, //拼接的data
        url: import.meta.env.VITE_URl + "v3/api/cd-key/search",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}
// 列表-标识查询
export function cardSecretManagementListSearchAll(opts) {
    let obj = opts || {};
    return service.request({
        method: "get",
        isForm: false,
        ifSplicing: true, //是否拼接
        splicingData: opts.splicingData || {}, //拼接的data
        url: import.meta.env.VITE_URl + "v3/api/cd-key/remarks/search",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}
// 生成卡密
export function cardSecretManagementAdd(opts) {
    let obj = opts || {};
    return service.request({
        method: "post",
        isForm: false,
        url: import.meta.env.VITE_URl + "v3/api/cd-key/add",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

// 下载文件
export function cardSecretManagementAddDownload(opts) {
    let obj = opts || {};
    return exportExcel({
        method: "get",
        excelType: ".json",
        excelTitle: "卡密文件",
        exportTip: "正在下载，请稍候...",
        url: import.meta.env.VITE_URl + "v3/api/cd-key/data/download",
        data: obj.data || {},
        isLoadding: obj.isLoadding || false,
        isCloseLoadding: obj.isCloseLoadding || false,
        isPop: obj.isPop,
    });
}
/*******插件管理********/
// 读取插件
export function plugInManagementList(opts) {
    let obj = opts || {};
    return service.request({
        method: "get",
        isForm: false,
        ifSplicing: true, //是否拼接
        splicingData: opts.splicingData || {}, //拼接的data
        url: import.meta.env.VITE_URl + "v3/api/plugin/data",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}
// 删除插件
export function plugInManagementDelete(opts) {
    let obj = opts || {};
    return service.request({
        method: "delete",
        isForm: false,
        url: import.meta.env.VITE_URl + "v3/api/plugin/delete",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}
// 刷新定时插件
export function plugInManagementRefresh(opts) {
    let obj = opts || {};
    return service.request({
        method: "PUT",
        isForm: false,
        url: import.meta.env.VITE_URl + "v3/api/plugin/cron/refresh",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

// 上传插件
export function plugInManagementUpload(opts) {
    let obj = opts || {};
    return service.request({
        method: "POST",
        // isForm: true,
        // isFile: true,
        ifSplicing: true, //是否拼接
        splicingData: opts.splicingData || {}, //拼接的data
        url: import.meta.env.VITE_URl + "v3/api/plugin/upload",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}
/*******用户管理********/
// 列表-标识查询
export function userVariableManagementSearchAll(opts) {
    let obj = opts || {};
    return service.request({
        method: "get",
        isForm: false,
        ifSplicing: true, //是否拼接
        splicingData: opts.splicingData || {}, //拼接的data
        url: import.meta.env.VITE_URl + "v3/api/user/env/data/search",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

// 修改用户变量
export function userVariableManagementUpdate(opts) {
    let obj = opts || {};
    return service.request({
        method: "put",
        isForm: false,
        url: import.meta.env.VITE_URl + "v3/api/user/env/data/update",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

// 删除用户变量

export function userVariableManagementDelete(opts) {
    let obj = opts || {};
    return service.request({
        method: "delete",
        isForm: false,
        url: import.meta.env.VITE_URl + "v3/api/user/env/data/delete",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}
/*******网站设置********/

// 获取网站设置信息
export function webSettingsSms(opts) {
    let obj = opts || {};
    return service.request({
        method: "GET",
        isForm: false,
        url: import.meta.env.VITE_URl + "v1/api/set/settings",
        data: obj.data || {},
        isLoadding: obj.isLoadding || false,
        isCloseLoadding: obj.isCloseLoadding || false,
        isPop: obj.isPop,
    });
}

export function webSettingsUpdate(opts) {
    let obj = opts || {};
    return service.request({
        method: "PUT",
        isForm: false,
        url: import.meta.env.VITE_URl + "v3/api/set/settings",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

/********容器管理********/

// 迁移
export function containerManagementTransfer(opts) {
    let obj = opts || {};
    return service.request({
        method: "post",
        isForm: false,
        url: import.meta.env.VITE_URl + "v3/api/container/transfer",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}
// 复制
export function containerManagementCopy(opts) {
    let obj = opts || {};
    return service.request({
        method: "post",
        isForm: false,
        url: import.meta.env.VITE_URl + "v3/api/container/copy",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}
// 备份
export function containerManagementBackup(opts) {
    let obj = opts || {};
    return service.request({
        method: "post",
        isForm: false,
        url: import.meta.env.VITE_URl + "v3/api/container/backup",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}
// 恢复
export function containerManagementRestore(opts) {
    let obj = opts || {};
    return service.request({
        method: "post",
        // isForm: true,
        ifSplicing: true, //是否拼接
        splicingData: opts.splicingData || {}, //拼接的data
        url: import.meta.env.VITE_URl + "v3/api/container/restore",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

// 任务错误记录查询
export function containerManagementErrorList(opts) {
    let obj = opts || {};
    return service.request({
        method: "get",
        isForm: false,
        url: import.meta.env.VITE_URl + "v3/api/container/error/content",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

// 备份数据下载
export function containerManagementBackUpDownload(opts) {
    let obj = opts || {};
    return exportExcel({
        method: "get",
        excelType: ".json",
        excelTitle: "backup",
        exportTip: "正在下载，请稍候...",
        url: import.meta.env.VITE_URl + "v3/api/container/backup/download",
        data: obj.data || {},
        isLoadding: obj.isLoadding || false,
        isCloseLoadding: obj.isCloseLoadding || false,
        isPop: obj.isPop,
    });
}

/***版本**/

export function webEdition(opts) {
    let obj = opts || {};
    return service.request({
        method: "get",
        isForm: false,
        url: import.meta.env.VITE_URl + "v1/api/system/version",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

/***修改用户消费信息****/

export function userRecharge(opts) {
    let obj = opts || {};
    return service.request({
        method: "POST",
        isForm: false,
        url: import.meta.env.VITE_URl + "v3/api/cd-key/user/recharge",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}
// 登录异常-发送验证码
export function abnormalCode(opts) {
    let obj = opts || {};
    return service.request({
        method: "POST",
        isForm: false,
        url: import.meta.env.VITE_URl + "v1/api/user/abnormal/code",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

// 登录异常-异常登录
export function abnormalSignin(opts) {
    let obj = opts || {};
    return service.request({
        method: "POST",
        isForm: false,
        url: import.meta.env.VITE_URl + "v1/api/user/abnormal/signin",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

// 手动刷新缓存
export function refreshCacheManually(opts) {
    let obj = opts || {};
    return service.request({
        method: "PUT",
        isForm: false,
        isSuccessPop: true,
        url: import.meta.env.VITE_URl + "v3/api/env/refresh",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}

// config.sh 同步
export function synchronizationPost(opts) {
    let obj = opts || {};
    return service.request({
        method: "POST",
        isForm: false,
        isSuccessPop: true,
        url: import.meta.env.VITE_URl + "v3/api/container/synchronization",
        data: obj.data || {},
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
        isPop: obj.isPop,
    });
}
