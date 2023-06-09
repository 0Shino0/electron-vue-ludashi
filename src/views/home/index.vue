<script lang="ts">
// 这是一个基于 TypeScript 的 Vue 组件
import { defineComponent, onMounted } from "vue";
import { Router, useRouter } from "vue-router";

import Liquidfill from "./components/Liquidfill.vue";
import $bus from "@/libs/eventBus";

export default defineComponent({
  components: {
    Liquidfill,
  },
  setup(props, context) {
    // 在这里声明数据，或者编写函数并在这里执行它
    // 在使用 setup 的情况下，请牢记一点：不能再用 this 来获取 Vue 实例
    const router: Router = useRouter();

    // 生命周期钩子
    onMounted(() => {
      window.addEventListener("resize", () => $bus.emit("windowOnresizePeace"));
    });

    // 方法 methods
    const changeRouter = () => {
      console.log(router);
      router.push({ name: "test" });
    };

    // 计算方法 computed

    // 监听 watch

    return {
      // 需要给 `<template />` 用的数据或函数，在这里 `return` 出去
      changeRouter,
    };
  },
});
</script>

<template>
  <div class="liquidfill_container">
    <Liquidfill></Liquidfill>
  </div>
</template>

<style lang="scss">
.liquidfill_container {
  position: absolute;
  width: 100%;
  height: calc(100% - (64px + 34px));
  text-align: center;
  // margin: 0 auto;
}
</style>
