import landingLayout from '../layout/landing/landingLayout'
import PageNotFound from "../views/shared/pageNotFound.vue";
import {
    clientStore as store
} from '../store';
import {
    appConstants
} from "../common/constants";

import {
    classes as classesStoreKeys,
    course as courseStoreKeys,
    auth as authStoreKeys,
    cart as cartStoreKeys
} from "../store/keys";
//import Home from "../views/home.vue";
import homeNew from "../views/homeNew.vue";
const routes = [{
    path: '/',
    redirect: "/",
    component: landingLayout,
    children: [
        //     {
        //     path: "",
        //     name: "home",
        //     //component: () => import( /* webpackChunkName: "group-home" */ '../views/home'),
        //     component: Home,
        //     meta: {
        //         isPublic: true,
        //         title: 'Home'
        //     }
        // },
        {
            path: "faq",
            name: "faq",
            component: () => import( /* webpackChunkName: "group-faq" */ '../views/faq'),
            meta: {
                isPublic: true,
                title: 'FAQs',
            }
        },
        {
            path: "admission",
            name: "admission",
            component: () => import( /* webpackChunkName: "group-admission" */ '../views/admission'),
            meta: {
                isPublic: true,
                title: 'Online Admissions',
            }
        },
        {
            path: "signUp",
            name: "signUp",
            component: () => import( /* webpackChunkName: "group-signUp" */ '../views/signUp/wizard_one'),
            meta: {
                isPublic: true,
                title: 'SignUp',
            },

            beforeEnter: async (to, from, next) => {
                try {
                    if (process.env.VUE_ENV === 'client') {
                        let cart = store.getters[`${cartStoreKeys.namespace}/${cartStoreKeys.getters.cart}`];
                        if (cart.length <= 0) {
                            next({
                                name: 'cart'
                            });
                        }

                        let hasToken = store.getters[`${authStoreKeys.namespace}/${authStoreKeys.getters.hasToken}`];
                        if (hasToken) {
                            window.location.href = `${process.env.VUE_APP_PORTAL_URL}/invoice/checkOut`;
                        } else {
                            next();
                        }
                    } else {
                        next();
                    }
                } catch (ex) {
                    console.log(ex)
                }
            }
        },

        {
            path: "",
            name: "homeNew",
            //component: () => import( /* webpackChunkName: "group-homeNew" */ '../views/homeNew'),
            component: homeNew,
            meta: {
                isPublic: true,
                title: 'HOMENEW',
            }
        },
        {
            path: "wizardLayout",
            name: "wizardLayout",
            component: () => import( /* webpackChunkName: "group-wizardLayout" */ '../views/wizardLayout'),
            meta: {
                isPublic: true,
                title: 'wizardLayout',
            },
        },
        {
            path: "demo",
            name: "demo",
            component: () => import( /* webpackChunkName: "group-demo" */ '../views/demo'),
            meta: {
                isPublic: true,
                title: 'Demo',
            }
        },
        {
            path: "howitworks",
            name: "howitworks",
            component: () => import( /* webpackChunkName: "group-howitworks" */ '../views/howitworks'),
            meta: {
                isPublic: true,
                title: 'HOW IT WORKS',
            }
        },
        {
            path: "privacy",
            name: "privacy",
            component: () => import( /* webpackChunkName: "group-privacy" */ '../views/privacy'),
            meta: {
                isPublic: true,
                title: 'Privacy Policy'
            }
        },
        {
            path: "class",
            name: "program",
            component: () => import( /* webpackChunkName: "group-class" */ '../views/course/class/program'),
            meta: {
                isPublic: true,
                title: 'program'
            }
        },
        {
            path: "class/:name",
            name: "class",
            component: () => import( /* webpackChunkName: "group-class" */ '../views/course/class'),
            meta: {
                isPublic: true,
                title: 'class'
            },
            beforeEnter: async (to, from, next) => {
                try {
                    if (process.env.VUE_ENV === 'client') {
                        let programId = to.path.split("-").pop();
                        let classExist = store.getters[`${classesStoreKeys.namespace}/${classesStoreKeys.getters.getClass}`](programId)[0];

                        if (classExist) {
                            await store.dispatch(`${courseStoreKeys.namespace}/${courseStoreKeys.actions.update_SelectedClass}`, {
                                data: {
                                    program: {
                                        id: classExist.ProgramId,
                                        name: classExist.Name
                                    },
                                    programCategory: {
                                        id: appConstants.enums.programCategory.Class,
                                        name: ""
                                    }
                                }
                            })

                            next();
                        } else {
                            next({
                                name: 'program'
                            });
                        }
                    } else {
                        next();
                    }
                } catch (ex) {
                    console.log(ex)
                }
            }
        },
        {
            path: "exam",
            name: "exam",
            component: () => import( /* webpackChunkName: "group-exam" */ '../views/course/exam'),
            meta: {
                isPublic: true,
                title: 'exam'
            }
        },
        {
            path: "class/detail/:course/:board/:group",
            name: "classDetail",
            component: () => import( /* webpackChunkName: "group-class" */ '../views/course/class/detail'),
            meta: {
                isPublic: true,
                title: 'detail'
            }
        },
        {
            path: "exam/detail/:course",
            name: "examDetail",
            component: () => import( /* webpackChunkName: "group-exam" */ '../views/course/exam/detail'),
            meta: {
                isPublic: true,
                title: 'detail'
            }
        },
        {
            path: "exam/:category",
            name: "examCategory",
            component: () => import( /* webpackChunkName: "group-exam" */ '../views/course/exam'),
            meta: {
                isPublic: true,
                title: 'exam'
            }
        },
        {
            path: "cart",
            name: "cart",
            component: () => import( /* webpackChunkName: "group-cart" */ '../views/course/cart'),
            meta: {
                isPublic: true,
                title: 'cart'
            }
        },
        {
            path: "programDetail/:programDetail",
            name: "programDetail",
            component: () => import( /* webpackChunkName: "group-programDetail" */ '../views/course/programDetail'),
            meta: {
                isPublic: true,
                title: 'programDetails',
            }
        },
        {
            path: "*",
            name: "landingPageNotFound",
            component: PageNotFound,
            meta: {
                isPublic: true,
                title: 'Error'
            }
        }
    ]
},
    // {
    //     path: "*",
    //     name: "PageNotFound",
    //     meta: {
    //         isPublic: true,
    //         title: 'Error'
    //     },
    //     component: landingLayout,
    //     children: [
    //         {
    //             path: "*",
    //             name: "landingPageNotFound",
    //             component: PageNotFound,
    //             meta: {
    //                 isPublic: true,
    //                 title: 'Error'
    //             }
    //         }
    //     ]
    // }
]


export default routes;