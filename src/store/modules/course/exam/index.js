
import courseService from '../../../../services/course.service';

export default {
    namespaced: true,
    state: () => ({
        sosCategories: []
    }),
    getters: {
        sosCategories(state) {
            return state.sosCategories;
        }
    },
    mutations: {
        setSOSCategories(state, model) {
            state.sosCategories = model.SOSCategories;
        }
    },
    actions: {
        getExams({ commit,state }, param) {
            if (state.sosCategories.length == 0) {
                return courseService.getExams(param).then(response => {
                    commit("setSOSCategories", response.data);
                }).catch((ex) => {
                    if (process.env.VUE_ENV === 'client') {
                        throw new Error('Server Error');
                    }
                });
            }
        }
    }
};