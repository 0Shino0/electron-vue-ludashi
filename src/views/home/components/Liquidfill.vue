<script lang="ts">
// 这是一个基于 TypeScript 的 Vue 组件
import {
  defineComponent,
  onMounted,
  ref,
  nextTick,
  onBeforeUnmount,
  markRaw,
} from "vue";

import * as echarts from "echarts";
import "echarts-liquidfill"; // 水球图

import os from "os";
const si = require("systeminformation");
console.log(si);
//
si.cpuTemperature().then((data: any) => console.log(data));

import $bus from "@/libs/eventBus";

export default defineComponent({
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "350px",
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
    chartData: {
      type: Object,
      required: false,
    },
  },
  setup(props, context) {
    // 在这里声明数据，或者编写函数并在这里执行它
    // 在使用 setup 的情况下，请牢记一点：不能再用 this 来获取 Vue 实例

    // const chart = ref<HTMLElement>();
    // const peaceBarCharts = ref();

    const liquidfillchart = ref<HTMLElement>();
    const peaceliquidfillchart = ref();
    const memoryRatio = ref<number>(0);
    const timer = ref<NodeJS.Timer | null>(null);
    // 生命周期钩子
    onMounted(() => {
      // 初始化
      memoryRatio.value = 1 - os.freemem() / os.totalmem();
      nextTick(() => {
        initChart();
      });

      const windowOnresizePeaceEvent = () => {
        peaceliquidfillchart.value.resize();
      };

      $bus.on("windowOnresizePeace", windowOnresizePeaceEvent);

      // 设置定时器
      timer.value = setInterval(() => {
        // console.log(1);
        updateChart();
      }, 2000);
    });

    onBeforeUnmount(() => {
      // 清除定时器
      if (timer.value != null) clearInterval(timer.value);
    });

    // 方法 methods

    const initChart = () => {
      peaceliquidfillchart.value = markRaw(
        echarts.init(liquidfillchart.value!)
      );

      setOptions();
    };

    const setOptions = () => {
      let peaceliquidfillOption = {
        animation: true,
        animationThreshold: 2000,
        animationDuration: 1000,
        animationEasing: "cubicOut",
        animationDelay: 0,
        animationDurationUpdate: 300,
        animationEasingUpdate: "cubicOut",
        animationDelayUpdate: 0,
        series: [
          {
            type: "liquidFill",
            name: "内存占用",
            // data: [0.81, 0.81],
            data: [memoryRatio.value, memoryRatio.value],
            waveAnimation: true,
            animationDuration: 2000,
            animationDurationUpdate: 1000,
            color: ["#294D99", "#156ACF", "#1598ED", "#45BDFF"],
            shape: "circle",
            backgroundStyle: {},
            outline: {
              show: false,
              borderDistance: 8,
            },
            label: {
              show: true,
              position: "inside",
              margin: 8,
              fontSize: 40,
              formatter: function (param: any) {
                return Math.floor(param.value * 10000) / 100 + "%";
              },
            },
          },
        ],
        legend: [
          {
            data: [],
            selected: {},
            show: true,
            padding: 5,
            itemGap: 10,
            itemWidth: 25,
            itemHeight: 14,
          },
        ],
        tooltip: {
          show: true,
          trigger: "item",
          triggerOn: "mousemove|click",
          axisPointer: {
            type: "line",
          },
          showContent: true,
          alwaysShowContent: false,
          showDelay: 0,
          hideDelay: 100,
          textStyle: {
            fontSize: 14,
          },
          formatter: function (param: any) {
            // console.log(param)
            return `${param.seriesName}：${
              Math.floor(param.value * 10000) / 100
            }%`;
          },
          borderWidth: 0,
          padding: 5,
        },
        title: [
          {
            text: "内存占用",
            top: "50",
            left: "center",
            padding: 5,
            itemGap: 10,
          },
        ],
      };
      peaceliquidfillchart.value.setOption(peaceliquidfillOption);
    };

    const updateChart = () => {
      memoryRatio.value = 1 - os.freemem() / os.totalmem();
      setOptions();
    };

    // 计算方法 computed

    // 监听 watch

    return {
      // 需要给 `<template />` 用的数据或函数，在这里 `return` 出去
      liquidfillchart,
    };
  },
});
</script>

<template>
  <div
    class="peace-liquidfill-charts"
    ref="liquidfillchart"
    style="width: 100%; height: 100%"
  ></div>
</template>

<style lang="scss">
// .peace-liquidfill-charts {
// }
</style>
