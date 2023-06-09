<script setup lang="ts"></script>

<template>
  <div class="left_container">
    <div class="left_items_center">
      <router-link to="/" class="left_item">
        <i class="iconfont icon-computer"></i> 内存占用
      </router-link>
      <router-link to="/hardware" class="left_item">
        <i class="iconfont icon-computer"></i> 硬件查看
      </router-link>
      <router-link to="/test" class="left_item">
        <i class="iconfont icon-computer"></i> 性能测试
      </router-link>
      <!-- <div class="left_item">标题</div>
      <div class="left_item">标题</div> -->
    </div>
  </div>
</template>

<style lang="scss">
.left_container {
  background-color: #fafafa;
  position: absolute;
  bottom: 0;
  /* width: 100px; */
  /* height: calc(100vh - 34px); */
  /* height: 500px; */
  /* margin-top: 34px; */
}

.left_items_center {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100vw;
  /* justify-content: space-between; */
  /* height: 100%; */
  /* padding-top: 120px; */
}

.left_item {
  /* margin-top: 24px; */

  width: 100%;
  height: 64px;
  line-height: 64px;
  text-align: center;
  cursor: pointer;
  /* padding: 20px 0px; */
  /* padding: 5px; */
}

.left_item:hover {
  /* background-color: darkblue; */
  color: #333;
  transition: color 500ms ease-out;

  .iconfont {
    color: #0065fe;
    transition: color 300ms ease-out;
  }
}
</style>
