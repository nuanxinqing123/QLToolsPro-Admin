/*
 * @Descripttion: 接口名称
 * @Author: LiLei
 * @Date: 2022-08-16 03:11:42
 * @LastEditors: LiLei
 * @LastEditTime: 2022-09-29 16:31:03
 */
import service from "./request";

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
        isPop: obj.isPop,
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
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
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
        isLoadding: obj.isLoadding || true,
        isCloseLoadding: obj.isCloseLoadding || true,
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
    return service.request({
        method: "get",
        isForm: false,
        isPop: false,
        ifSplicing: true, //是否拼接
        splicingData: opts.splicingData || {}, //拼接的data
        url: "https://wxpusher.zjiecode.com/api/fun/scan-qrcode-uid",
        data: obj.data || {},
        isLoadding: obj.isLoadding || false,
        isCloseLoadding: obj.isCloseLoadding || false,
        isPop: obj.isPop,
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
