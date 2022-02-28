const express = require('express');
const router = express.Router();
const formController = require('../controllers/forms.controller');
const createFormMiddleware = require('../middleware/createForm-middleware')


/* GET programming languages. */
router.get('/', formController.get);
  
/* POST programming language */
router.post('/create', createFormMiddleware.createForm, formController.create);

module.exports = router;