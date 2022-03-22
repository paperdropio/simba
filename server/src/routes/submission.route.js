const express = require('express');
const router = express.Router();
const submitController = require('../controllers/submission.controller');
const submitValidationMiddleware = require('../middleware/submission-validation-middleware')


router.post('/', submitValidationMiddleware.submitForm, submitController.submitForm);

module.exports = router;