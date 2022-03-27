const GeneralResult = require('../models/generalResult.model');
const Submission = require('../models/submission.model');
const submissionService = require('../services/submissions.services');

async function submitForm(req, res, next) {
  try {
    const model = new Submission(req.body);
    const result = await submissionService.saveSubmission(model);
    res.json(new GeneralResult(result.success, result.insertedId));

  } catch (err) {
    console.error(`Caught exception`, err.message);
    next(err);
  }
}

module.exports = {
  submitForm
};