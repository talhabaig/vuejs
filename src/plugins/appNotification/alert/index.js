import { clientStore } from '../../../store';
import { AlertTypeEnum } from "./constants";
import { alert } from '../../../store/keys';
import AlertModel from "../../../models/app/alertModel";
const newActionKey = `${alert.namespace}/${alert.actions.new}`;
const store = clientStore;

export default {
  // The install method will be called with the Vue constructor as the first argument, along with possible options
  install(Vue, options) {
    // Add instance methods directly to Vue components
    // Create store and router instances.

    Vue.prototype.$alert = (alertModel) => {
      store.dispatch(newActionKey, alertModel);
    }

    Vue.prototype.$alertSuccess = (message) => {
      let alertModel = new AlertModel(message, AlertTypeEnum.Success)
      store.dispatch(newActionKey, alertModel);
    }

    Vue.prototype.$alertError = (message) => {
      let alertModel = new AlertModel(message, AlertTypeEnum.Error)
      store.dispatch(newActionKey, alertModel);
    }

    // Add $surname instance property directly to Vue components
    // Vue.prototype.$surname = 'Smith'
  }
}
