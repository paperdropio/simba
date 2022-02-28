const Validator = require('validatorjs');
let _ = require('lodash');
 

const fieldValidator = (value, attribute, req, passes) => {
    if ( !_.isArray(value)){
        passes(false, 'fields is not a list');
    }

    if ( value.length == 0 ) {
        passes(false, 'fields missing');
    }

    const fieldRules = {
        "name": "required",
        "display-name": "required",
    };

    const errors = [];
    _.forEach(value, (field) => {
        const validation = new Validator(field, fieldRules);

        if ( !validation.check() ){
            errors.push(validation.errors);
        }
    });

    if ( errors.length > 0) {
        passes(false, errors);
    } else {
        passes(true);
    }
};

module.exports = {
    fieldValidator
};