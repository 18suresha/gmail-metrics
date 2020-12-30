const state = {
  weeks: []
};

const getters = {
  allWeeks: state => state.weeks,
};

const actions = {
  fetchWeeks({ commit }) {
    let weeks = [{ value: null, text: 'Please select a week' }];
    let start = new Date('12/27/2020');
    let today = new Date();
    while (start <= today) {
      weeks.push({
        value: start.toDateString(),
        text: start.toDateString()
      });
      start.setDate(start.getDate() + 7);
    }
    commit('setWeeks', weeks);
  },
};

const mutations = {
  setWeeks: (state, weeks) => (state.weeks = weeks)
};

export default {
  state,
  getters,
  actions,
  mutations
};
