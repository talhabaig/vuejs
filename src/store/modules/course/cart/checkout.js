import {
    cart as cartStoreKeys
} from '../../../keys';
import moment from 'moment';

const getCheckoutModel = () => {
    return {
        id: 0,
        instituteId: 0,
        items: [],
    }
};

export default {
    namespaced: true,
    state: getCheckoutModel(),
    getters: {
        checkout(state) { return state }
    },
    mutations: {
        add(state, model) {
            state.id = model.id;
            state.instituteId = model.instituteId;
            state.items = model.items;
        }
    },
    actions: {
        checkout({ state, commit, getters, rootGetters }, model) {
            let checkoutModel = getCheckoutModel();
            checkoutModel.id = moment().valueOf();
            
            rootGetters[cartStoreKeys.namespace + '/' + cartStoreKeys.getters.cart].forEach(function (obj, index) {
                checkoutModel.instituteId = obj.InstituteId;

                checkoutModel.items.push({
                    in: obj.InstituteId,
                    s: obj.SOSId,
                    cg: obj.CourseGroupId,
                    po: obj.PaymentOption,
                    ppi: obj.SOSPaymentPlanId,
                });
            });

            commit('add', checkoutModel);
        }
    }
};
