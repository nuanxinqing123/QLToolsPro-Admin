/*
 * @Descripttion: Descripttion
 * @Author: LiLei
 * @Date: 2022-08-15 23:10:20
 * @LastEditors: LiLei
 * @LastEditTime: 2022-10-04 20:47:21
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
    // devServer: {
    //     proxy: {
    //         "/": {
    //             target: "http://h.6b7.xyz:6600/", //接口域名
    //             changeOrigin: true, //是否跨域
    //             ws: true, //是否代理 websockets
    //             secure: true, //是否https接口
    //             pathRewrite: {
    //                 //路径重置
    //                 "^/api": "",
    //             },
    //         },
    //     },
    // },
    // 代理设置
    server: {
        hot: true, //自动保存
        // ← ← ← ← ← ←
        host: "0.0.0.0", // ← 新增内容 ←
        proxy: {
            "/api": {
                target: "http://h.6b7.xyz:6600/",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
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
