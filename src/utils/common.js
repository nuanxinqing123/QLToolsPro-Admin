/*
 * @Descripttion: 带T时间转化
 * @Author: LiLei
 * @Date: 2022-09-24 13:28:42
 * @LastEditors: LiLei
 * @LastEditTime: 2022-09-24 13:29:32
 */
export function dateTtoDateStr(dateStr) {
    return dateStr.split(".")[0].replace("T", " ");
}
