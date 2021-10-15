import programService from '../../services/program.service';

export default {
    namespaced: true,
    state: {
        programList: [],
        totalRecords: 0
    },
    getters: {
        programList(state) {
            return state.programList;
        }
    },
    mutations: {
        setProgramList(state, model) {
            state.programList = model.programList.Courses;
            state.totalRecords = model.programList.TotalRecords;
        },
    },
    actions: {
        getProgramList({ commit }, param) {

            return programService.getProgramList(param).then(response => {

                commit("setProgramList", {
                    programList: response.data,
                    pagingMode: param.pagingMode
                });
            }).catch((ex) => {
                if (process.env.VUE_ENV === 'client') {
                    throw new Error('Server Error');
                }

                console.log(ex.message);
            });
        },
    }
};
