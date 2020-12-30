<template>
  <div>
    <h3>{{metricDescriptions[metric]}}</h3>
    <line-chart :data="allPoints[metric]"></line-chart>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Chart",
  data() {
      return {
          metricDescriptions: {
              'fgtm': 'From Gmail Users to Me',
              'fngtm': 'From Non-Gmail Users To Me',
              'fmtg': 'From Me to Gmail Users',
              'fmtng': 'From Me to Non-Gmail Users'
          }
      }
  },
  props: ["metric"],
  computed: mapGetters(["allPoints"])
};
</script>

<style scoped>
div {
  margin-top: 40px;
  padding: 6px;
  border: #41b883 1px solid;
  border-radius: 10px;
}
</style>
