<script setup lang="ts">
// import HelloWorld from "./components/HelloWorld.vue";
// import Header from "@/layout/Header.vue";
// import Left from "@/layout/Left.vue";
import Loaders from "@/components/Loaders/index.vue";

import { ref, onMounted } from "vue";
import { getHardwareInfo, HardwareMember } from "@/utils/index";

import { GpuInfoMember } from "@/utils/index";
const gpuInfo = require("gpu-info");
// gpu info
// console.log(gpuInfo());

const hardwareObj = ref<HardwareMember>();
const gpuInfoProcess = ref<GpuInfoMember[]>([]);
const hardwareFlag = ref<boolean>(false);
const loadingFlag = ref<boolean>(false);

function getGpuInfo() {
  gpuInfo().then(function (data: any) {
    // console.log("GPUS:", data);
    for (let i = 0; i < data.length; i++) {
      // console.log(data[i]);
      gpuInfoProcess.value[i] = {
        label: `GPU${i}`,
        value: data[i].Description,
      };
    }
    // console.log(hardwareObj.gpuInfo);
  });
}
getGpuInfo();
hardwareObj.value = getHardwareInfo();
onMounted(() => {
  // nextTick(() => {
  //   // console.log(hardwareObj.value);
  // });
});

const handleTest = () => {
  // if (hardwareFlag.value === false) {
  //   changeLoading();
  // }
  const timer = setTimeout(() => {
    // hardwareFlag.value = true;
    hardwareFlag.value = !hardwareFlag.value;
    clearTimeout(timer);
  }, 300);
};

const changeLoading = (wait: number = 300) => {
  loadingFlag.value = true;
  const timer = setTimeout(() => {
    loadingFlag.value = false;
    clearTimeout(timer);
  }, wait);
};
</script>

<template>
  <!-- <Header></Header> -->
  <!-- <Loaders v-show="loadingFlag"></Loaders> -->
  <div class="app_main_container">
    <!-- <Left></Left> -->
    <div class="hardware_button" @click="handleTest">
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
        <span>硬件检测</span>
      </button>
    </div>

    <div class="app_right_container" v-if="hardwareFlag">
      <!-- 显示硬件信息 -->
      <!-- <div @click="test"><button>123</button></div> -->
      <div class="hardware_container" v-if="!!hardwareObj">
        <ul class="hardware_list">
          <li class="hardware_item">
            <span class="hardware_label">系统平台：</span>
            <span class="hardware_value">{{ hardwareObj.pf }}</span>
          </li>
          <li class="hardware_item">
            <span class="hardware_label">系统版本：</span>
            <span class="hardware_value">{{ hardwareObj.release }}</span>
          </li>
          <li class="hardware_item">
            <span class="hardware_label">系统位数：</span>
            <span class="hardware_value">{{ hardwareObj.arch }}</span>
          </li>
          <li class="hardware_item">
            <span class="hardware_label">操作系统内核：</span>
            <span class="hardware_value">{{ hardwareObj.kernel }}</span>
          </li>
          <li class="hardware_item">
            <span class="hardware_label">主机名：</span>
            <span class="hardware_value">{{ hardwareObj.hn }}</span>
          </li>
          <li class="hardware_item">
            <span class="hardware_label">总内存：</span>
            <span class="hardware_value">{{
              hardwareObj.sysMen.totalMem
            }}</span>
          </li>
          <li class="hardware_item">
            <span class="hardware_label">空闲内存：</span>
            <span class="hardware_value">{{ hardwareObj.sysMen.freeMem }}</span>
          </li>
          <li class="hardware_item">
            <span class="hardware_label">开机时间：</span>
            <span class="hardware_value">{{ hardwareObj.uptime }}</span>
          </li>
          <li class="hardware_item">
            <span class="hardware_label">CPU：</span>
            <span class="hardware_value">{{ hardwareObj.cpuInfo }}</span>
          </li>
          <li class="hardware_item">
            <span class="hardware_label">GPU：</span> <br />
            <ul v-for="item in gpuInfoProcess">
              <li class="hardware_item">
                <span class="hardware_label">{{ item.label }}：</span>
                <span class="hardware_value">{{ item.value }}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
.app_main_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - (64px + 34px));
}
.hardware_button {
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

/* 硬件查看 */
.app_right_container {
  /* width: 100vw; */
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  /* margin-top: 34px; */
  /* background-color: blue; */
}

/* .hardware_container {
}
.hardware_list {
} */
.hardware_item {
  color: #333;
  font-weight: bold;
}
</style>
