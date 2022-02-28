const Validator = require('validatorjs');
const fieldValidator = require("./validators/fieldValidator")

Validator.registerAsync("formFieldValidator", fieldValidator);

const validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    
    validation.passes(() => callback(null, true));

    validation.fails(() => callback(validation.errors, false));
};

module.exports = validator;