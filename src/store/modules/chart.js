import axios from 'axios';

const state = {
  points: {
    'fgtm': {},
    'fngtm': {},
    'fmtg': {},
    'fmtng': {}
  }
};

const getters = {
  allPoints: state => state.points
};

const actions = {
  async updatePoints({ commit }, selectedWeek) {
    let currDate = new Date(selectedWeek);
    let newPoints = {
      'fgtm': {},
      'fngtm': {},
      'fmtg': {},
      'fmtng': {}
    };
    let today = new Date();
    let i = 0;
    do {
      let currDateStr = currDate.getFullYear().toString() + '-' + (currDate.getMonth() + 1).toString() + '-' + currDate.getDate().toString();
      for (var j = 0; j < 24; ++j) {
        let resp = await axios.get('http://gmail-metrics-endpoint.eba-uztvywac.us-east-2.elasticbeanstalk.com/gmail', {
          params: {
            date: currDateStr,
            hour: j
          }
        })
        for (let key in newPoints) {
          newPoints[key][currDateStr + ' ' + j.toString() + ':00:00 -0600'] = resp.data[key];
        }
      }
      currDate.setDate(currDate.getDate() + 1);
      ++i;
    } while (i < 7 && currDate <= today);
    commit('setPoints', newPoints);
  }
};

const mutations = {
  setPoints: (state, points) => (state.points = points)
};

export default {
  state,
  getters,
  actions,
  mutations
};
