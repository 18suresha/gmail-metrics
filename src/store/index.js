import Vuex from 'vuex';
import Vue from 'vue';
import week from './modules/week';
import chart from './modules/chart'

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    week,
    chart
  }
});
