import { createApp } from './main';
import cookieBus from './cookieBus.js'
// import AlertModel from "./models/app/alertModel";
// import { AlertTypeEnum } from "./plugins/appNotification/alert/constants";
// import { alert } from './store/keys';
// const alertActionKey = `${alert.namespace}/${alert.actions.new}`;
// const { url, cookie } = context
// cookieBus.$cookie = cookie

export default ctx => {
    // since there could potentially be asynchronous route hooks or components,
    // we will be returning a Promise so that the server can wait until
    // everything is ready before rendering.
    const { cookie } = ctx;
    cookieBus.$cookie = cookie;

    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp(ctx);
        // set server-side router's location
        
        const meta = app.$meta();
        
        router.push(ctx.url).catch(error => {
            if (error.name != "NavigationDuplicated") {
                throw error;
            }
        });

        ctx.meta = meta;

        // wait until router has resolved possible async components and hooks
        router.onReady(() => {
            const machedComponents = router.getMatchedComponents();
            if (!machedComponents.length) {
                return reject({ code: 404 });
            }
            Promise.all(machedComponents.map(component => {
                if (component.asyncData) {
                    return component.asyncData({
                        store,
                        route: router.currentRoute
                    })
                }
            })).then(() => {
                ctx.state = store.state;
                resolve(app);
            })//.catch(reject);
                .catch((ex) => {
                    console.log(ex.message);
                    //let alertModel = new AlertModel(ex.message, AlertTypeEnum.Error)
                    //store.dispatch(alertActionKey, alertModel);
                });
            // the Promise should resolve to the app instance so it can be rendered
            //resolve(app)

        }, reject)
    })
}