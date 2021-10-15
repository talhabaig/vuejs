
import courseService from '../../../../services/course.service';
import { appConstants } from "../../../../common/constants";
import {
    course as courseStoreKeys
} from '../../../keys';

export default {
    namespaced: true,
    state: () => ({
        classes: []
    }),
    getters: {
        classes(state) {
            return state.classes;
        },
        getClass(state) {
            return programId => state.classes.filter(function (field) {
                return field.ProgramId == programId
            });
        },
    },
    mutations: {
        setClasses(state, model) {
            state.classes = model.Classes;
        }
    },
    actions: {
        getClasses({ commit, state, root, dispatch }, param) {

            if (state.classes.length == 0) {
                return courseService.getClasses(param).then(response => {
                    commit("setClasses", response.data);

                    // if (response.data.Classes) {
                    //     dispatch(courseStoreKeys.namespace + '/' + courseStoreKeys.actions.update_SelectedClass, {
                    //         data: {
                    //             program: { id: response.data.Classes[0].ProgramId, name: response.data.Classes[0].Name },
                    //             programCategory: {
                    //                 Id: appConstants.enums.programCategory.Class,
                    //                 name: ""
                    //             }
                    //         },
                    //         config: {
                    //             loader: {
                    //                 show: false,
                    //             },
                    //         },
                    //     }, {
                    //             root: true
                    //         });
                    // }



                }).catch((ex) => {
                    if (process.env.VUE_ENV === 'client') {
                        throw new Error('Server Error');
                    }
                });
            }
        }
    }
};