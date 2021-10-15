import courseService from '../../../services/course.service';
import {
    course as courseStoreKeys,
} from '../../keys';

const getDefaultCourseDetail = () => {
    return {
        courseDetail: {
            DisplayName: '...',
            ShortDescription: '',
            Description: '',
            PaymentPlans: []
        },
    }
};

export default {
    namespaced: true,
    state: getDefaultCourseDetail(),
    getters: {
        courseDetail(state) {
            return state.courseDetail;
        },
        selectedPlan(state) {
            return state.courseDetail.PaymentPlans.filter((plan) => {
                return plan.IsSelectedPlan === true
            })[0];
        },
        isCourseDetailExist: (state) => (sosId) => {
            let isExist = false;

            if (state.courseDetail) {
                isExist = state.courseDetail.SOSId == sosId
            }

            return isExist;
        }
    },
    mutations: {
        setCourseDetail(state, model) {
            state.courseDetail = model;
        },
        updateSelectedPlan(state, payload) {
            state.courseDetail.PaymentPlans.forEach((plan, index) => {
                plan.IsSelectedPlan = plan.SOSPaymentPlanId === payload.selectedSOSPaymentPlanId ? true : false
            });
        },
        resetCourseDetail(state) {
            Object.assign(state, getDefaultCourseDetail());
        }
    },
    actions: {
        getCourseDetail({
            state,
            commit,
            rootState,
            rootGetters,
            dispatch,
            getters
        }, param) {
            if (!getters.isCourseDetailExist(param.data.SOSId)) {
                return courseService.getCourseDetail(param).then(response => {

                    dispatch(courseStoreKeys.namespace + '/' + courseStoreKeys.actions.update_SelectedSOS, {
                        data: {
                            id: response.data.SOSId,
                            name: response.data.Name
                        }
                    }, {
                        root: true
                    });

                    let selectedCourseGroupId = rootState.course.selectedCourseInfo.courseGroup.id;
                    if (selectedCourseGroupId == 0) {
                        dispatch(courseStoreKeys.namespace + '/' + courseStoreKeys.actions.update_SelectedCourseGroup, {
                            data: {
                                id: Number(param.data.CourseGroupId),
                                name: ''
                            }
                        }, {
                            root: true
                        });
                    }

                    commit("setCourseDetail", response.data);
                }).catch((ex) => { 
                    if (process.env.VUE_ENV === 'client') {
                        // throw new Error('Server Error');
                        throw ex;
                    }
                    console.log(ex.message);
                });
            }
        },
        updateSelectedPlan({
            state,
            commit
        }, param) {
            return commit("updateSelectedPlan", param.data);
        },
        resetCourseDetail({
            state,
            commit
        }) {
            commit("setCourseDetail");
        }
    },
};