<script setup lang="ts">
// import HelloWorld from "./components/HelloWorld.vue";
import Header from "./layout/Header.vue";
import Left from "./layout/Left.vue";
import { ref, onMounted } from "vue";
import { getHardwareInfo, HardwareMember } from "./utils/index";

import { GpuInfoMember } from "./utils/index";
const gpuInfo = require("gpu-info");
// gpu info
console.log(gpuInfo());

const hardwareObj = ref<HardwareMember>();
const gpuInfoProcess = ref<GpuInfoMember[]>([]);

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
</script>

<template>
  <Header></Header>
  <div class="app_main_container">
    <Left></Left>
    <div class="app_right_container">
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
}

.app_right_container {
  /* width: 100vw; */
  display: flex;
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
