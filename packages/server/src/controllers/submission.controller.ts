import GeneralResult from '../models/generalResult.model';
const submissionService = require('../services/submissions.services');
import Submission from '../models/submission.model';

async function submitForm(req: any, res: any, next: any) {
  try {
    const model = new Submission(req.body);
    const result = await submissionService.saveSubmission(model);
    res.json(new GeneralResult(result.success, result.insertedId));

  } catch (err: any) {
    console.error(`Caught exception`, err.message);
    next(err);
  }
}

module.exports = {
  submitForm
};