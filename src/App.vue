<template>
  <div id="app" ref="appRef">
    <router-view />
  </div>
</template>
<script>
import drawMixin from "@/utils/drawMixin";
export default {
  mixins: [drawMixin],
};
</script>

<style lang="scss" scoped>
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(
    to right,
    rgb(148, 175, 233),
    rgb(199, 213, 230),
    rgb(209, 200, 188)
  );
}
</style>
