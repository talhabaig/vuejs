
const getDefaultState = () => {
  return {
    isFixed: false,
  }
};


export default {
  namespaced: true, //Avoid of same namespace
  state: getDefaultState(),
  getters: {
    isFixed(state) {
      return state.isFixed;
    },
  },
  mutations: {
    setisFixed(state, isFixed) {
      state.isFixed = isFixed;
    },
    resetState(state, isFixed) {
      Object.assign(state, getDefaultState());
    }
  },
  actions: {
    headerToggle({ commit }, param) {
      commit('setisFixed', param);
    },
    resetHeaderState({ state, commit }) {
      return commit("resetState");
    }
  }
};