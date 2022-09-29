/*
 * @Descripttion: Descripttion
 * @Author: LiLei
 * @Date: 2022-08-15 23:10:20
 * @LastEditors: LiLei
 * @LastEditTime: 2022-08-16 02:15:12
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        // cssCodeSplit: true,
        rollupOptions: {
            output: {
                chunkFileNames: "js/[name].[hash].js",
                entryFileNames: "js/[name].[hash].js",
                // 分割打包
                // manualChunks(id) {
                //     if (id.includes("node_modules")) {
                //         return id
                //             .toString()
                //             .split("node_modules/")[1]
                //             .split("/")[0]
                //             .toString();
                //     }
                // },
            },
        },
        assetsDir: "assets",
        publicPath: "./", // 公共路径
        outDir: "dist",
    },

    base: "./", // 公共路径
    server: {
        hot: true, //自动保存
        // ← ← ← ← ← ←
        host: "0.0.0.0", // ← 新增内容 ←
        // fs: {
        //     strict: false,
        // },
        // proxy: {
        //     // 字符串简写写法
        //     // "/foo": "http://localhost:4567",
        //     // 选项写法
        //     "/": {
        //         target: "https://dev-fp-pile-station.quicklycharge.com",
        //         changeOrigin: true,
        //         secure: false, // 如果是https接口，需要配置这个参数
        //         // ws: true, //websocket支持
        //         rewrite: (path) => path.replace(/^\/api/, ""),
        //     },
        // },
    },

    productionSourceMap: false, // 生产环境下css 分离文件
    css: {
        // 引用全局 scss
        preprocessorOptions: {
            scss: {
                additionalData: '@import "./src/module.scss";',
            },
        },
    },
    resolve: {
        // 别名
        alias: {
            "@": path.resolve(__dirname, "src"),
            utils: path.resolve(__dirname, "src/utils"),
            components: path.resolve(__dirname, "src/components"),
            stores: path.resolve(__dirname, "src/stores"),
            // plugins: path.resolve(__dirname, "src/plugins"),
            // views: path.resolve(__dirname, "src/views"),
            // layouts: path.resolve(__dirname, "src/layouts"),
            // apis: path.resolve(__dirname, "src/apis"),
            // dirs: path.resolve(__dirname, "src/directives"),
        },
    },
});
