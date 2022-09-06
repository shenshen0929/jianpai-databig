<template>
  <Echart
    :options="options"
    id="moreLineRate"
    width="100%"
    height="100%"
    ref="moreLine"
  ></Echart>
</template>

<script>
import Echart from "@/common/echart";
export default {
  props: ["options"],
  components: {
    Echart,
  },
};
</script>
