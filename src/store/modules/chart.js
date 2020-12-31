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

    let timezoneDiff = Math.floor(today.getTimezoneOffset() / 60);
    let diff_str = ("0" + timezoneDiff).slice(-2).toString() + '00';
    if (timezoneDiff > 0) {
      diff_str = ' -' + diff_str;
    } else if (timezoneDiff < 0) {
      diff_str = ' +' + diff_str;
    } else {
      diff_str = '';
    }

    let i = 0;
    do {
      let currDateStr = currDate.getFullYear().toString() + '-' + (currDate.getMonth() + 1).toString() + '-' + currDate.getDate().toString();
      let currDateStrUTC = currDate.getUTCFullYear().toString() + '-' + (currDate.getUTCMonth() + 1).toString() + '-' + currDate.getUTCDate().toString();
      let resp = await axios.get('http://gmail-metrics-endpoint.eba-uztvywac.us-east-2.elasticbeanstalk.com/gmail', {
        params: {
          date: currDateStrUTC,
          hour: currDate.getUTCHours()
        }
      })
      for (let key in newPoints) {
        newPoints[key][currDateStr + ' ' + currDate.getHours().toString() + ':00:00' + diff_str] = resp.data[key];
      }

      currDate.setHours(currDate.getHours() + 1);
      ++i;
    } while (i < 24 * 7 && currDate <= today);
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
