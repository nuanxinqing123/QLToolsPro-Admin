/*
 * @Descripttion: Descripttion
 * @Author: LiLei
 * @Date: 2021-05-10 13:30:49
 * @LastEditors: LiLei
 * @LastEditTime: 2022-10-06 14:44:37
 */
import { createApp } from "vue";
import Antd from "ant-design-vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import "ant-design-vue/dist/antd.css";
import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
const app = createApp(App);
const pinia = createPinia();

app.use(router).use(pinia).use(Antd).use(Vue3ColorPicker).mount("#app");
app.config.productionTip = false;
