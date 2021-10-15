import { clientStore as store } from "../store";
import { headerType } from "../store/keys";
/**
 * Check access permission to auth routes
 */
export function checkAccessMiddleware(to, from, next) {
  //console.log(to.name, headerType)
  if (to.name != "homeNew") {
    store.dispatch(
      `${headerType.namespace}/${headerType.actions.headerToggle}`,
      true
    );
  } else {
    store.dispatch(
      `${headerType.namespace}/${headerType.actions.headerToggle}`,
      false
    );
  }

  return next();
}
