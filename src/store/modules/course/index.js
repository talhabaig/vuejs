import {
    board as boardStoreKeys
} from '../../keys';

const getDefaultSelectedCourseInfo = () => {
    return {
        selectedCourseInfo: {
            program: { id: 0, name: '' },
            programCategory: { id: 0, name: '' },
            board: { id: 0, name: '' },
            courseGroup: { id: 0, name: '' },
            sos: { id: 0, name: '' },
            sosCategory: { id: 0, name: '' }
        },
        currentWizard: 'wizard-step2'
    }
};
export default {
    namespaced: true,
    state: getDefaultSelectedCourseInfo(),
    getters: {
        selectedCourseInfo(state) {
            return state.selectedCourseInfo;
        },
        selectedProgram(state) {
            return state.selectedCourseInfo.program;
        },
        selectedProgramCategory(state) {
            return state.selectedCourseInfo.programCategory;
        },
        selectedBoard(state) {
            return state.selectedCourseInfo.board;
        },
        selectedCourseGroup(state) {
            return state.selectedCourseInfo.courseGroup;
        },
        selectedCourseSOS(state) {
            return state.selectedCourseInfo.sos;
        },
        selectedSOSCategory(state) {
            return state.selectedCourseInfo.sosCategory;
        },
        currentWizard(state) {
            return state.currentWizard;
        }
    },
    mutations: {
        setSelectedClass(state, courseClass) {
            state.selectedCourseInfo.program = courseClass.program;
            state.selectedCourseInfo.programCategory = courseClass.programCategory;
        },
        setSelectedExam(state, exam) {
            state.selectedCourseInfo.program = exam.program;
            state.selectedCourseInfo.sos = exam.sos;
            state.selectedCourseInfo.programCategory = exam.programCategory;
            state.selectedCourseInfo.courseGroup = exam.courseGroup;
            state.selectedCourseInfo.sosCategory = exam.sosCategory;
        },
        setSelectedClassBoard(state, board) {
            state.selectedCourseInfo.board = board;
        },
        setSelectedCourseGroup(state, courseGroup) {
            state.selectedCourseInfo.courseGroup = courseGroup;
        },
        setSelectedSOS(state, sos) {
            state.selectedCourseInfo.sos = sos;
        },
        setSelectedSOSCategory(state, sosCategory) {
            state.selectedCourseInfo.sosCategory = sosCategory;
        },
        setCurrentWizard(state, currentWizard) {
            state.currentWizard = currentWizard;
        },
        resetSelectedCourseInfo(state) {
            Object.assign(state, getDefaultSelectedCourseInfo())
        }
    },
    actions: {
        updateSelectedClass({ state, commit, rootState, dispatch }, param) {
            commit('setSelectedClass', param.data);
           
            // dispatch(boardStoreKeys.namespace + '/' + boardStoreKeys.actions.get_ClassBoards, {
            //     data: {
            //         ProgramId: param.data.program.id,
            //     },
            //     config: {
            //         loader: {
            //             show: true,
            //         },
            //     },
            // }, {
            //     root: true
            // });
        },
        updateSelectedExam({ commit }, param) {
            commit('setSelectedExam', param.data);
        },
        updateSelectedClassBoard({ commit }, param) {
            commit('setSelectedClassBoard', param.data);
        },
        updateSelectedCourseGroup({ commit }, param) {
            commit('setSelectedCourseGroup', param.data);
        },
        updateSelectedSOS({ commit }, param) {
            commit('setSelectedSOS', param.data);
        },
        updateSelectedSOSCategory({ commit }, param) {
            commit('setSelectedSOSCategory', param.data);
        },
        updateCurrentWizard({ commit }, param) {
            commit('setCurrentWizard', param.data);
        },
        resetSelectedCourseInfo({ commit }, param) {
            commit('resetSelectedCourseInfo', param);
        }
    }
};
