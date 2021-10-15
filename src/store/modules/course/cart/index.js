import {
    appConstants
} from "../../../../common/constants";
import {
    checkout as checkoutStoreKeys,
} from '../../../keys';
import {
    clientStore as store
} from '../../../../store';
export default {
    namespaced: true,
    state: {
        cart: []
    },
    getters: {
        totalRecordInCart(state) {
            return state.cart.length;
        },
        cart(state) {
            return state.cart;
        },
        totalAmount(state) {
            return state.cart.reduce((acc, product) => acc + product.Amount, 0);
        },
        isCourseExist(state) {
            return sosId => state.cart.some(function (field) {
                return field.SOSId == sosId
            });
        },
        GetSelectedSOSFromCart(state) {
            return sosId => state.cart.find(function (sos) {
                if (sos.SOSId == sosId) {
                    return sos;
                }
            })
        }
    },
    mutations: {
        add(state, model) {
            if (appConstants.enums.PaymentOption.Trial == model.PaymentOption) {
                state.cart = [];
            }
            
            if (state.cart && state.cart.length) {
                if (state.cart.some(x => x.PaymentOption == appConstants.enums.PaymentOption.Trial)) {
                    state.cart = [];
                }
            }

            state.cart.push(model);
        },
        remove(state, sosId) {
            let i = state.cart.map(product => product.SOSId).indexOf(sosId)
           
            if (i !== -1) {
                state.cart.splice(i, 1);
            }
        },
    },
    actions: {
        addToCart({
            commit,
            dispatch,
            getters
        }, model) {
            if (getters.isCourseExist(model.data.SOSId)) {
                // check isCourseExist if exist then throw exception course already exist 
                if (process.env.VUE_ENV === 'client') {
                    return Promise.reject('Course already exist');
                }
            }

            commit('add', model.data);
            
            store.dispatch(
                `${checkoutStoreKeys.namespace}/${checkoutStoreKeys.actions.checkout_cart}`
            )
        },
        removeFromCart({
            state,
            commit
        }, model) {
            commit('remove', model.data);
        }
    }
};