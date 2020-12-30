<template>
  <div>
    <h3>Choose Week :</h3>
    <b-form-select
      @change="onSelect"
      v-model="selectedWeek"
      :options="allWeeks"
    ></b-form-select>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Week",
  data() {
    return {
      selectedWeek: null,
    };
  },
  methods: {
    ...mapActions(["fetchWeeks", "updatePoints"]),
    onSelect() {
      if (this.selectedWeek !== null) {
        this.updatePoints(this.selectedWeek);
      }
    },
  },
  computed: mapGetters(["allWeeks"]),
  created() {
    this.fetchWeeks();
  },
};
</script>

<style scoped>
b-form-select {
  margin-top: 20px;
  padding: 6px;
  border: #41b883 2px solid;
  border-radius: 10px;
}
</style>
