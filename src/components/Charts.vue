<template>
  <div>
    <Chart v-for="metric in metrics" :key="metric" v-bind:metric="metric" />
  </div>
</template>

<script>
import Chart from './Chart.vue'
export default {
  name: "Charts",
  components: {
      Chart
  },
  data() {
    return {
      metrics: []
    };
  },
  created() {
    this.metrics = ['fgtm', 'fngtm', 'fmtg', 'fmtng'];
  }
};
</script>

<style scoped>

</style>
