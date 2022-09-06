<template>
  <Echart
    :options="options"
    id="oneBarBig"
    width="100%"
    height="100%"
    ref="oneBar"
  ></Echart>
</template>

<script>
import Echart from "@/common/echart";
export default {
  components: {
    Echart,
  },
  props: ["options"],
};
</script>
