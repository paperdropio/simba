import Submission from "../models/submission.model";
const { submitForm } = require('../dal/submission.dal');
const moment = require('moment');
var httpContext = require('express-http-context');

export function saveSubmission(formSubmission: Submission) {
    formSubmission.submittedOn = moment().utc().format();
    //formSubmission.requestId = httpContext.get('requestId');
    const result = submitForm(formSubmission);
    
    return result;
}