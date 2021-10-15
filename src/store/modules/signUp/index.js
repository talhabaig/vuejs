const getDefaultState = () => {
    return {
        form: {},
    };
};
export default {
    namespaced: true, //Avoid of same namespace
    state: getDefaultState(),
    getters: {

    },
    mutations: {
        signUp(state, params) {
            state.form = params.form;
        },
    },
    actions: {
        signUp({
            state,
            commit
        }, param) {
            commit('signUp', param.data);
        }
    }
};