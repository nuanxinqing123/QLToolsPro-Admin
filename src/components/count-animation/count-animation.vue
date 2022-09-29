<!--
 * @Descripttion: 数字动画
 * @Author: LiLei
 * @Date: 2021-11-14 18:13:38
 * @LastEditors: LiLei
 * @LastEditTime: 2022-09-29 15:42:30
-->
<template>
    <span>{{toFixed(count)}}</span>
</template>

<script>
import { defineComponent, toRefs, ref, watch } from 'vue';
import { gsap } from "gsap"

export default defineComponent({
    props: {
        num: {
            type: [Number, String],
            default: 0
        }
    },
    setup (props, ct) {
        const { num } = toRefs(props);
        let number = parseFloat(num.value || 0);
        if (typeof number === "number") {
            number = JSON.stringify(number);
        }
        let fixNum = number.split(".")[1] ? number.split(".")[1].length : 0;
        const count = ref(0);
        const toFixed = (numStr) => numStr.toFixed(fixNum);
        const counter = () => {
            gsap.to(count, { duration: 1, value: number })
        }
        counter();
        // 定义 watch 监听
        watch(
            num,
            (newCount, old, clear) => {
                // 执行异步任务，并得到关闭异步任务的 id
                // console.log(newCount, old)
                count.value = 0;
                number = parseFloat(newCount || 0);
                if (typeof number === "number") {
                    number = JSON.stringify(number);
                }
                fixNum = number.split(".")[1] ? number.split(".")[1].length : 0;

                counter();

                // 如果 watch 监听被重复执行了，则会先清除上次未完成的异步任务
            },
            // watch 刚被创建的时候不执行
            { lazy: true }
        );
        return {
            num,
            toFixed,
            count,
        };
    },
});
</script>
