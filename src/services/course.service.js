import BaseService from './base/base.service';
import {
    apiEndPoints
} from './constants.js'

class CourseService extends BaseService {
    getClasses(param) {
        return this.get(apiEndPoints.course.getClasses , false, param.data, param.config);
    }
    getClassBoards(param) {
        return this.get(apiEndPoints.course.getClassBoards , false, param.data, param.config);
    }
    getClassGroups(param) {
        return this.get(apiEndPoints.course.getClassGroups , false, param.data, param.config);
    }
    getClassCourses(param) {
        return this.get(apiEndPoints.course.getClassCourses , false, param.data, param.config);
    }
    getCourseDetail(param) {
        return this.get(apiEndPoints.course.getCourseDetail , false, param.data, param.config);
    }
    
    getExams(param) {
        return this.get(apiEndPoints.course.getExams , false, param.data, param.config);
    }
    getExamCourses(param) {
        return this.get(apiEndPoints.course.getExamCourses , false, param.data, param.config);
    }
}

export default new CourseService()
