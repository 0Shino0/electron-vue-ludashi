<script setup lang="ts">
import Loaders from "@/components/Loaders/index.vue";
import CountUp from "vue-countup-v3";
import type { ICountUp, CountUpOptions } from "vue-countup-v3";

import { ref, onMounted } from "vue";
import { getHardwareInfo, HardwareMember, GpuInfoMember } from "@/utils/index";

// node
// const { performance } = require("perf_hooks");
const si = require("systeminformation");

// const gpuInfo = require("gpu-info");
// const gpuInfoProcess = ref<GpuInfoMember[]>([]);

// const cpuScore = ref<number>(0);
const cpuScore = ref<number>(0);
const gpuScore = ref<number>(0);
const totalScore = ref<number>(0);
const testLoaders = ref<boolean>(false);
// coutup.js options
const options = ref<CountUpOptions>({
  prefix: "性能总分：",
  // separator: "❤️",
  // ...
});

// let countUpCtx = ref<ICountUp | undefined>(undefined);
let countUpCtx: ICountUp | undefined = undefined;
const onInit = (ctx: ICountUp) => {
  // console.log("init", ctx);
  // countUpCtx.value = ctx;
  countUpCtx = ctx;
};
// 更新
const updateScore = (ctx: ICountUp | undefined, score: number) => {
  ctx?.update(score);
};

const onFinished = () => {
  console.log("finished");
};

onMounted(() => {
  // getCpuScore();
  // getGpuScore();
  // perfTest();
});

// methods
// const perfTest = () => {
//   const startTime = performance.now();
//   // 需要测试性能的代码
//   const count = 10 * 1000 * 1000; // 百万次加
//   for (let i = 0; i < count; i++) {
//     // 执行一些计算密集型的操作
//   }
//   const endTime = performance.now();
//   console.log(`代码执行时间：${endTime - startTime}ms`);
// };

const getCpuScore = async () => {
  si.cpu().then((data: any) => {
    // console.log(data);
    // 浮点数峰值性能=CPU核心数*频率*16
    testLoaders.value = false;
    let score: number = data.speed * data.cores * 16 * 15;
    cpuScore.value = score;
    // countUpCtx.value?.update(cpuScore.value);

    getTotalScore();
  });
  // const data = await si.cpu();
  // let score: number = data.speed * data.cores * 16;
  // console.log(score);
  // cpuScore.value = score;
  // si.mem().then((data: any) => console.log(data));
};

// gpu info
const getGpuScore = () => {
  // const si = require("systeminformation");
  si.graphics().then((data: any) => {
    // console.log("gpu memoryTotal", data.controllers)
    for (let i = 0; i < data?.controllers?.length; i++) {
      // console.log(data?.controllers[i]);
      if (data?.controllers[i]?.memoryTotal != undefined) {
        gpuScore.value += data?.controllers[i]?.memoryTotal;
      }
    }
    // console.log(gpuScore.value);
  });
};

const getTotalScore = () => {
  totalScore.value = gpuScore.value + cpuScore.value;
  console.log("total:", totalScore.value);
  console.log("gpuScore:", gpuScore.value);
  console.log("cpuScore:", cpuScore.value);
};

const handleTest = () => {
  // cpuScore.value = cpuScore.value + 100;
  // countUpCtx.value?.update(cpuScore.value);
  // updateScore(countUpCtx, cpuScore.value);
  testLoaders.value = true;
  getCpuScore();
  getGpuScore();
};
</script>

<template>
  <loaders v-show="testLoaders"></loaders>
  <div class="test_container">
    <div class="test_button" @click="handleTest">
      <button>
        <div class="svg-wrapper-1">
          <div class="svg-wrapper">
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
        <span>性能测试</span>
      </button>
    </div>
    <div class="test_footer_container">
      <count-up
        class="score_item test_count_up"
        :end-val="totalScore"
        :duration="2.5"
        :decimal-places="2"
        :options="options"
        :loop="2"
        :delay="2"
        @init="onInit"
        @finished="onFinished"
      ></count-up>
      <div class="score_item cpu_score">
        <span>CPU总分：</span> {{ gpuScore }}
      </div>
      <div class="score_item cpu_score">
        <span>GPU总分：</span> {{ cpuScore }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.test_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - (64px + 34px));
}

.test_button {
  display: flex;
  justify-content: center;
  transition: all 3s ease;
}

/* button按钮 */
button {
  font-family: inherit;
  font-size: 20px;
  background: royalblue;
  color: white;
  padding: 0.7em 1em;
  padding-left: 0.9em;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 16px;
  overflow: hidden;
  /* transition: all 0.2s; */
  transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

button span {
  display: block;
  margin-left: 0.3em;
  transition: all 0.3s ease-in-out;
}

button svg {
  display: block;
  transform-origin: center center;
  transition: transform 0.3s ease-in-out;
}

button:hover .svg-wrapper {
  animation: fly-1 0.6s ease-in-out infinite alternate;
}

button:hover svg {
  transform: translateX(1.2em) rotate(45deg) scale(1.1);
}

button:hover span {
  transform: translateX(5em);
}

button:active {
  transform: scale(0.95);
}

@keyframes fly-1 {
  from {
    transform: translateY(0.1em);
  }

  to {
    transform: translateY(-0.1em);
  }
}

// 底部分数
// .test_footer_container{

// }
.test_count_up {
  font-size: 32px;
  font-weight: bold;
}

.score_item {
  margin-top: 20px;
}
</style>
