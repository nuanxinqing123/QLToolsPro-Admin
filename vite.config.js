/*
 * @Descripttion: Descripttion
 * @Author: LiLei
 * @Date: 2022-08-15 23:10:20
 * @LastEditors: LiLei
 * @LastEditTime: 2022-10-07 19:40:25
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import viteCompression from "vite-plugin-compression";

import path from "path";
// https://vitejs.dev/config/
export default ({ mode }) => {
    return defineConfig({
        plugins: [
            vue(),
            // viteCompression({
            //     //压缩，让体积更小
            //     verbose: true,
            //     disable: false,
            //     threshold: 10240,
            //     algorithm: "gzip",
            //     ext: ".gz",
            // }),
        ],
        build: {
            // 清除console和debugger
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                },
            },
            // cssCodeSplit: true,
            rollupOptions: {
                output: {
                    //配置这个是让不同类型文件放在不同文件夹，不会显得太乱
                    chunkFileNames: "js/[name]-[hash].js",
                    entryFileNames: "js/[name]-[hash].js",
                    assetFileNames: "[ext]/[name]-[hash].[ext]",
                    manualChunks(id) {
                        //静态资源分拆打包
                        if (id.includes("node_modules")) {
                            return id
                                .toString()
                                .split("node_modules/")[1]
                                .split("/")[0]
                                .toString();
                        }
                    },
                },
            },
            target: "modules",
            outDir: "static", //指定输出路径
            assetsDir: "", // 指定生成静态资源的存放路径
            emptyOutDir: true, //打包前先清空原有打包文件
        },

        base: process.env.NODE_ENV === "development" ? "./" : "static/", // 公共路径
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
                "/foo": {
                    target: "http://h.6b7.xyz:6600/",
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/foo/, ""),
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
};
