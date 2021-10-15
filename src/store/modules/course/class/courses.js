import courseService from '../../../../services/course.service';
import { appConstants } from "../../../../common/constants";
import { CourseModel } from '../../../../models/app/courseModel';

const getDefaultClassCourses = () => {
    return {
        courseStorage: [],
        courseList: [],
        totalRecords: 0,
        pageNumber: 1,
    }
};

export default {
    namespaced: true,
    state: getDefaultClassCourses(),
    getters: {
        courseList(state) {
            return state.courseList;
        },
        selectedCoursePlan: (state) => (sosId, courseGroupId) => {
            let selectedCourse = state.courseList.filter((course) => { return course.SOSId === sosId && course.CourseGroupId === courseGroupId })[0];

            if (selectedCourse) {
                return selectedCourse.PaymentPlans.filter((plan) => { return plan.IsSelectedPlan === true })[0];
            }

            return null;
        },
        canLoadMore(state) {
            return state.courseList.length < state.totalRecords;
        },
        isCoursesExist: (state) => (param) => {
            let isExist = state.courseStorage.some(function (obj) {
                return obj.CourseGroupCategoryId == param.CourseGroupCategoryId
                    && obj.ProgramCategoryId == param.ProgramCategoryId
                    && obj.ProgramId == param.ProgramId
                    && obj.BoardId == param.BoardId
                    && obj.CourseGroupId == param.CourseGroupId
            });

            return isExist;
        }
    },
    mutations: {
        setClassCourses(state, { courseModel }) {

            // if (courseModel.PagingMode === appConstants.enums.pagingMode.loadMore) {
            //     state.courseList = [...state.courseList, ...courseModel.Course.Courses];
            // } else {
            //     state.courseList = courseModel.Course.Courses;
            // }

            // state.totalRecords = courseModel.Course.TotalRecords;

            let record = state.courseStorage.filter(function (obj, index) {
                return obj.CourseGroupCategoryId == courseModel.CourseGroupCategoryId
                    && obj.ProgramCategoryId == courseModel.ProgramCategoryId
                    && obj.ProgramId == courseModel.ProgramId
                    && obj.BoardId == courseModel.BoardId
                    && obj.CourseGroupId == courseModel.CourseGroupId
            })[0];

            state.pageNumber = record.PageNumber;
            state.courseList = record.Course.Courses;
            state.totalRecords = record.Course.TotalRecords;
        },
        updateCourseStorage(state, { courseModel }) {

            if (courseModel.PagingMode === appConstants.enums.pagingMode.loadMore) {
                let record = state.courseStorage.forEach(function (obj, index) {
                    if (obj.CourseGroupCategoryId == courseModel.CourseGroupCategoryId
                        && obj.ProgramCategoryId == courseModel.ProgramCategoryId
                        && obj.ProgramId == courseModel.ProgramId
                        && obj.BoardId == courseModel.BoardId
                        && obj.CourseGroupId == courseModel.CourseGroupId) {

                        obj.PageNumber = courseModel.PageNumber;
                        obj.Course.Courses = [...obj.Course.Courses, ...courseModel.Course.Courses];
                        obj.Course.TotalRecords = courseModel.Course.TotalRecords;
                    }
                });


            } else {
                state.courseStorage.push(courseModel);
            }

        },
        updateSelectedCoursePlan(state, payload) {
            state.courseList.forEach((course, index) => {
                if (course.SOSId === payload.selectedCourse.SOSId && course.CourseGroupId === payload.selectedCourse.CourseGroupId) {
                    course.PaymentPlans.forEach((plan, index) => {
                        plan.IsSelectedPlan = plan.SOSPaymentPlanId === payload.selectedSOSPaymentPlanId ? true : false
                    });
                }
            });
        },
        resetState(state, payload) {
            Object.assign(state, getDefaultClassCourses());
        }
    },
    actions: {
        getClassCourses({
            commit, getters, state
        }, param) {

            let courseModel = new CourseModel();
            courseModel.PagingMode = param.pagingMode;
            courseModel.PageNumber = param.data.PageNumber;
            courseModel.CourseGroupCategoryId = param.data.CourseGroupCategoryId;
            courseModel.ProgramCategoryId = param.data.ProgramCategoryId;
            courseModel.ProgramId = param.data.ProgramId;
            courseModel.BoardId = param.data.BoardId;
            courseModel.CourseGroupId = param.data.CourseGroupId;

            if (!getters.isCoursesExist(param.data) || param.pagingMode === appConstants.enums.pagingMode.loadMore) {

                return courseService.getClassCourses(param).then(response => {


                    courseModel.Course = response.data;
                    commit('updateCourseStorage', {
                        courseModel: courseModel
                    });

                    commit('setClassCourses', {
                        courseModel: courseModel
                    });

                    return Promise.resolve({ PageNumber: state.pageNumber });
                });
            } else {

                commit('setClassCourses', {
                    courseModel: courseModel
                });

                return Promise.resolve({ PageNumber: state.pageNumber });
            }
        },
        updateSelectedCoursePlan({ state, commit }, param) {
            return commit("updateSelectedCoursePlan", param.data);
        },
        resetClassCourses({ state, commit }) {
            return commit("resetState");
        }
    }
};