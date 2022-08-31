<template>
  <div class="number">
    {{
      typeof number === "string" && number.includes("%")
        ? `${showNumber}%`
        : showNumber
    }}
  </div>
</template>

<script>
import moment from "moment";
const numberTimer = null;
const timer = null;
export default {
  props: ["number"],
  data() {
    return {
      showNumber: 0,
      outTime: moment(),
    };
  },
  watch: {
    number(newData) {
      this.numberHandle(newData);
    },
    outTime() {
      this.numberHandle(this.number);
    },
  },
  mounted() {
    setInterval(() => {
      this.outTime = moment();
      this.showNumber = 0;
    }, 50000);
    if (this.number) {
this.numberHandle(this.number);
    }
    
  },
  beforeDestroy() {
    if (numberTimer) {
      clearInterval(numberTimer);
    }
    if (timer) {
      clearInterval(timer);
    }
  },
  methods: {
    numberHandle(data) {
      let num = data;
      let level = 2;
      if (typeof data === "string" && data.includes("%")) {
        num = data.slice(0, length - 1);
      }
      if (num <= 100 && num > 50) {
        level = 5;
      } else if (num > 100 && num < 500) {
        level = 10;
      } else if (num >= 500 && num < 1000) {
        level = 50;
      } else if (num >= 1000 && num < 5000) {
        level = 100;
      } else if (num >= 5000) {
        level = 500;
      }
      
      const timer = setInterval(() => {
        if (num - this.showNumber < level) {
          this.showNumber = num;
          clearInterval(timer);
          return;
        }
        console.log(num, this.showNumber)
        this.showNumber = +this.showNumber + level
      }, 100);
    },
  },
};
</script>

<style>
.number {
  color: rgb(57, 79, 76);
  text-align: left;
  font-size: 16px;
}
</style>
