import BaseService from './base/base.service';
import {
    apiEndPoints
} from './constants.js'

class ProgramService extends BaseService {
    getProgramList(param) {
        return this.get(apiEndPoints.courses.getCourses , false, param.data, param.config);
    }
}

export default new ProgramService()
