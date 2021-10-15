import AlertModel from "../../../models/app/alertModel";
export default {
  namespaced: true,
  state: {
    model: new AlertModel(),
  },
  getters: {
    model(state) {
      return state.model;
    }
  },
  mutations: {
    SET_ALERT(state, alertModel) {
      state.model = alertModel
    },
    CLEAR_ALERT(state) {
      state.model = new AlertModel("", "");
    }
  },
  actions: {
    new({ state, commit }, model) {
      commit('SET_ALERT', model);
    },
    clear({ state, commit }) {
      commit('CLEAR_ALERT');
    }
  }
}
