const express = require('express');
const router = express.Router();
const formController = require('../controllers/forms.controller');
const formValidationMiddleware = require('../middleware/form-validation-middleware')


router.get('/', formController.get);
router.post('/create', formValidationMiddleware.createForm, formController.createForm);
router.post('/save', formValidationMiddleware.saveForm, formController.saveForm);
router.post('/publish', formController.publishForm);

export default router;