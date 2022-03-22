const moment = require('moment');

class GeneralResult {
    constructor(success, obj, message) {
        this.success = success;
        this.result = obj;
        this.message = message;
        this.resultTime = moment().utc().format();
    }
}

module.exports = GeneralResult;