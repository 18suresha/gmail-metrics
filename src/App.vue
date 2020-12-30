<template>
  <div id="app">
    <div class="container">
      <Week />
      <Charts />
    </div>
  </div>
</template>

<script>
import Week from "./components/Week.vue";
import Charts from "./components/Charts.vue";

export default {
  name: "app",
  components: {
    Week,
    Charts,
  },
};
</script>

<style>
body {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  line-height: 1.6;
  background: #e8f7f0;
}

.container {
  max-width: 1100px;
  margin: auto;
  overflow: auto;
  padding: 0 2rem;
}
</style>
