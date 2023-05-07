<script setup lang="ts"></script>

<template>
  <div class="left_container">
    <div class="left_items_center">
      <div class="left_item">我的电脑</div>
      <div class="left_item">性能测试</div>
      <div class="left_item">磁盘查看</div>
      <!-- <div class="left_item">标题</div>
      <div class="left_item">标题</div> -->
    </div>
  </div>
</template>

<style>
.left_container {
  width: 100px;
  /* height: 500px; */
  height: calc(100vh - 34px);
  background-color: #fafafa;
  margin-top: 34px;
}

.left_items_center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* justify-content: space-between; */
  height: 100%;
  /* padding-top: 120px; */
}

.left_item {
  /* margin-top: 24px; */
  width: 100%;
  text-align: center;
  padding: 20px 0px;
  cursor: pointer;
  /* padding: 5px; */
}

.left_item:hover {
  /* background-color: darkblue; */
  color: #333;
  transition: color 500ms ease-out;
}
</style>
