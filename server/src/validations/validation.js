const Validator = require('validatorjs');
const { formFieldValidator } = require("./validators/formFieldValidator");
const { validDataTypeValidator } = require("./validators/formFieldValidator");
const { formIdValidator } = require("./validators/formIdValidator");
const { submissionFieldValidator } = require("./validators/submissionFieldValidator");
let _ = require('lodash');

Validator.registerAsync("formFieldValidator", formFieldValidator);
Validator.registerAsync("formFieldValidDataTypeValidator", validDataTypeValidator, "Data Type not valid");

Validator.registerAsync("formIdValidator", formIdValidator);
Validator.registerAsync("submissionFieldValidator", submissionFieldValidator);

const validator = async (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    
    await validation.checkAsync(() => callback(null, true), (errors) => callback(validation.errors, false));
};

module.exports = validator;