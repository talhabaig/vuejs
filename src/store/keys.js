export const headerType = Object.freeze({
  namespace: "headerType",
  getters: {
    isFixed: "isFixed",
  },
  actions: {
    headerToggle: "headerToggle",
  }
});


export const alert = Object.freeze({
  namespace: 'alert',
  getters: {
    model: 'model'
  },
  actions: {
    new: 'new',
    clear: 'clear'
  }
});

export const programs = Object.freeze({
  namespace: 'programs',
  getters: {
    programList: 'programList'
  },
  actions: {
    get_ProgramList: 'getProgramList'
  }
});

export const exam = Object.freeze({
  namespace: 'exam',
  getters: {
    sosCategories: 'sosCategories'
  },
  actions: {
    get_Exams: 'getExams'
  }
});

export const classes = Object.freeze({
  namespace: 'classes',
  getters: {
    classes: 'classes',
    getClass: 'getClass'
  },
  actions: {
    get_Classes: 'getClasses'
  }
});

export const course = Object.freeze({
  namespace: 'course',
  getters: {
    selectedCourseInfo: "selectedCourseInfo",
    selectedProgram: "selectedProgram",
    selectedProgramCategory: "selectedProgramCategory",
    selectedBoard: "selectedBoard",
    selectedCourseGroup: "selectedCourseGroup",
    selectedCourseSOS: "selectedCourseSOS",
    selectedSOSCategory: "selectedSOSCategory",
    currentWizard: "currentWizard"
  },
  actions: {
    update_SelectedClass: 'updateSelectedClass',
    update_SelectedExam: 'updateSelectedExam',
    update_SelectedClassBoard: 'updateSelectedClassBoard',
    update_SelectedCourseGroup: 'updateSelectedCourseGroup',
    update_SelectedSOS: 'updateSelectedSOS',
    update_SelectedSOSCategory: 'updateSelectedSOSCategory',
    update_CurrentWizard: 'updateCurrentWizard',
    reset_SelectedCourseInfo: 'resetSelectedCourseInfo'
  }
});

export const courseGroup = Object.freeze({
  namespace: 'courseGroup',
  getters: {
    courseGroups: 'courseGroups'
  },
  actions: {
    get_CourseGroups: 'getCourseGroups',
    reset_CourseGroups: 'resetCourseGroups',
  }
});

export const board = Object.freeze({
  namespace: 'board',
  getters: {
    boards: 'boards'
  },
  actions: {
    get_ClassBoards: 'getClassBoards',
    reset_Boards: 'resetBoards'
  }
});

export const classCourses = Object.freeze({
  namespace: 'courses',
  getters: {
    courseList: 'courseList',
    selectedCoursePlan: 'selectedCoursePlan',
    canCoursesLoadMore: 'canLoadMore'
  },
  actions: {
    get_ClassCourses: 'getClassCourses',
    update_SelectedCoursePlan: 'updateSelectedCoursePlan',
    reset_ClassCourses: 'resetClassCourses'
  }
});

export const courseDetail = Object.freeze({
  namespace: 'detail',
  getters: {
    courseDetail: 'courseDetail',
    selectedPlan: 'selectedPlan'
  },
  actions: {
    get_CourseDetail: 'getCourseDetail',
    update_SelectedPlan: 'updateSelectedPlan',
    reset_CourseDetail: 'resetCourseDetail'
  }
});

export const signUp = Object.freeze({
  namespace: 'signUp',
  getters: { 
  },
  actions: { 
    sign_Up: 'signUp'
  }
}); 

export const cart = Object.freeze({
  namespace: 'cart',
  getters: {
    cart: 'cart',
    totalAmount: 'totalAmount',
    totalRecordInCart: 'totalRecordInCart',
    isCourseExist: 'isCourseExist',
    GetSelectedSOSFromCart: 'GetSelectedSOSFromCart'
  },
  actions: {
    add_ToCart: 'addToCart',
    remove_FromCart: 'removeFromCart'
  }
});

export const checkout = Object.freeze({
  namespace: 'checkout',
  actions: {
    checkout_cart: 'checkout',
  },
  getters: {
    checkout_state: 'checkout',
  },
  mutations: {
    add: "add"
  },
});

export const auth = Object.freeze({
  namespace: 'auth',
  mutations: {
  },
  getters: {
    hasToken: 'hasToken',
    token: "token"
  },
  actions: { 
  },
});