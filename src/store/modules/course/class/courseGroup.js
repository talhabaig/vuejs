import courseService from '../../../../services/course.service';
import { CourseGroupModel } from '../../../../models/app/courseGroupModel';

const getDefaultCourseGroups = () => {
    return {
        programCourseGroups: [],
    }
};

export default {
    namespaced: true,
    state: getDefaultCourseGroups(),
    getters: {
        courseGroups: (state) => (programId, boardId) => {
            //return state.courseGroups;
            var filteredCourseGroups = state.programCourseGroups.filter(function (obj) {
                return obj.ProgramId == programId && obj.BoardId == boardId;
            });

            return filteredCourseGroups[0] ? filteredCourseGroups[0].CourseGroups : [];
        },
        isCourseGroupExist(state) {
            return (programId, boardId) => state.programCourseGroups.some(function (obj) {
                return obj.ProgramId == programId && obj.BoardId == boardId
            });
        }
    },
    mutations: {
        setCourseGroups(state, model) {
            // state.courseGroups = model.CourseGroups;
            state.programCourseGroups.push(model);
        },
        resetState(state, payload) {
            Object.assign(state, getDefaultCourseGroups());
        }
    },
    actions: {
        getCourseGroups({ commit, getters }, param) {
            if (!getters.isCourseGroupExist(param.data.ProgramId, param.data.BoardId)) {
                return courseService.getClassGroups(param).then(response => {
                    let courseGroupModel = new CourseGroupModel();
                    courseGroupModel.ProgramId = param.data.ProgramId;
                    courseGroupModel.BoardId = param.data.BoardId;
                    courseGroupModel.CourseGroups = response.data.CourseGroups;
                    commit("setCourseGroups", courseGroupModel);

                    return Promise.resolve({ CourseGroups: getters.courseGroups(param.data.ProgramId, param.data.BoardId) });
                }).catch((ex) => {
                    if (process.env.VUE_ENV === 'client') {
                        throw new Error('Server Error');
                    }
                    console.log(ex.message);
                });
            }
            else {
                return Promise.resolve({ CourseGroups: getters.courseGroups(param.data.ProgramId, param.data.BoardId) });
            }

        },
        resetCourseGroups({ state, commit }) {
            return commit("resetState");
        }
    }
};