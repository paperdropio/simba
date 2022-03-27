const { submitForm } = require('../dal/submission.dal');
const moment = require('moment');
var httpContext = require('express-http-context');

function saveSubmission(formSubmission) {
    formSubmission.submittedOn = moment().utc().format();
    formSubmission.requestId = httpContext.get('requestId');
    const result = submitForm(formSubmission);
    
    return result;
}

module.exports = {
    saveSubmission
}