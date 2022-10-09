/*
 * @Descripttion: 带T时间转化
 * @Author: LiLei
 * @Date: 2022-09-24 13:28:42
 * @LastEditors: LiLei
 * @LastEditTime: 2022-10-09 10:01:19
 */
export function dateTtoDateStr(dateStr) {
    return dateStr.split(".")[0].replace("T", " ");
}
// number转为 string
export function numberToString(num) {
    if (typeof num === "string") {
        return num;
    } else {
        try {
            return JSON.stringify(num);
        } catch (error) {
            return "";
        }
    }
}
