import courseService from '../../../../services/course.service';
import {
    course as courseStoreKeys
} from '../../../keys';
import { ProgramBoardModel } from '../../../../models/app/programBoardModel';

const getDefaultBoards = () => {
    return {
        // boards: [],
        programBoards: []
    }
};

export default {
    namespaced: true,
    state: getDefaultBoards(),
    getters: {
        boards: (state) => (programId) => {
            var filteredBoards = state.programBoards.filter(function (obj) {
                return obj.ProgramId == programId;
            });

            return filteredBoards[0] ? filteredBoards[0].Boards : [];
        },
        isBoardExist(state) {
            return programId => state.programBoards.some(function (obj) {
                return obj.ProgramId == programId
            });
        }
    },
    mutations: {
        setBoards(state, model) {
            // state.boards = model.Boards;
            state.programBoards.push(model);
        },
        resetState(state, payload) {
            Object.assign(state, getDefaultBoards());
        }
    },
    actions: {
        getClassBoards({ commit, dispatch, rootState, getters }, param) {
            if (!getters.isBoardExist(param.data.ProgramId)) {
                return courseService.getClassBoards(param).then(response => {
                    let programBoardModel = new ProgramBoardModel();
                    programBoardModel.ProgramId = param.data.ProgramId;
                    programBoardModel.Boards = response.data.Boards;
                    commit("setBoards", programBoardModel);

                    return Promise.resolve({ Boards: getters.boards(param.data.ProgramId) });
                }).catch((ex) => {
                    if (process.env.VUE_ENV === 'client') {
                        throw new Error('Server Error');
                    }
                    console.log(ex.message);
                });
            } else {
                return Promise.resolve({ Boards: getters.boards(param.data.ProgramId) });
            }
        },
        resetBoards({ state, commit }) {
            return commit("resetState");
        }
    }
};