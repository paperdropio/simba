const moment = require('moment');

class GeneralResult {
    success: boolean;
    result?: any;
    message?: string;
    resultTime: string;
    
    constructor(success:boolean, obj?:any, message?:string) {
        this.success = success;
        this.result = obj;
        this.message = message;
        this.resultTime = moment().utc().format();
    }
}

export default GeneralResult;