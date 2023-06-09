<script setup lang="ts">
import { ipcRenderer } from "electron";
// window.electronAPI.sendMessage("Hello from App.vue!");
// console.log(window.electronAPI);

function toMin() {
  // ipcRenderer.send("handle:toMin-app");
  // window.electronAPI.toMinApp("handle:toMin-app");
  ipcRenderer.send("toMinApp");
}

function toMax() {
  // window.electronAPI.toMaxApp("handle:toMax-app");
  // ipcRenderer.send("handle:toMax-app");
  ipcRenderer.send("toMaxApp");
}

function toClose() {
  ipcRenderer.send("closeApp");
  // window.electronAPI.closeApp("handle:close-app");
  // ipcRenderer.send("handle:close-app");
}
</script>

<template>
  <div class="header_menu">
    <router-link to="/" class="header_menu_item">
      <div class="menu_item_title">鲁小师</div>
    </router-link>
    <!-- <div></div> -->
    <div class="container_icon">
      <!-- <div class="icon-item">
        <i class="iconfont icon-min"></i>
      </div>
      <div class="icon-item">
        <i class="iconfont icon-max"></i>
      </div>
      <div class="icon-item">
        <i class="iconfont icon-close"></i>
      </div> -->
      <div class="icon-item" @click="toMin">
        <i class="iconfont icon-min"></i>
      </div>
      <!-- <div class="icon-item" @click="toMax">
        <i class="iconfont icon-max"></i>
      </div> -->
      <div class="icon-item" @click="toClose">
        <i class="iconfont icon-close"></i>
      </div>
    </div>
  </div>
</template>

<style>
a {
  text-decoration: none;
}

.header_menu {
  /* 默认情况下, 无边框窗口是不可拖拽的。 应用程序需要在 CSS 中指定 -webkit-app-region: drag 来告诉 Electron 哪些区域是可拖拽的（如操作系统的标准标题栏），在可拖拽区域内部使用 -webkit-app-region: no-drag 则可以将其中部分区域排除。 请注意, 当前只支持矩形形状。 */
  -webkit-app-region: drag;

  /* width: 20rem; */
  display: flex;
  padding-left: 10px;
  /* padding-right: 10px; */
  /* padding-top: 5px; */
  /* padding-bottom: 5px; */
  justify-content: space-between;
  width: calc(100vw - 10px);
  height: 34px;
  line-height: 34px;
  /* position: absolute;
  top: 0;
  left: 0; */
  background-color: #fafafa;
}

.header_menu_item {
  /* -webkit-app-region: no-drag; */
  /* cursor: pointer; */
  /* 创建可拖拽区域时，拖拽行为可能与文本选择相冲突。 例如，当您拖动标题栏时，您可能不小心选中其中的文本。 为了避免这种情况，您需要在可拖拽区域中禁用文本选择，像这样 */
  /* -webkit-user-select: none; */
  -webkit-app-region: no-drag;
  /* width: 5rem; */
}

.menu_item_title {
  font-weight: bold;
  color: #333;
}

.container_icon {
  display: flex;
}

.icon-item {
  /* margin-left: 10px; */
  color: #333;
  text-align: center;
  cursor: pointer;
  -webkit-app-region: no-drag;
  width: 3rem;
}

.icon-item:hover {
  /* background-color: red; */
  color: red;
  background-color: #00000044;
  transition-property: background-color, color;
  transition-duration: 0.5s;
  transition-timing-function: ease-out;
}
</style>
