const Validator = require('validatorjs');
let _ = require('lodash');
const fieldDataType = require('../../enums/fieldDataTypes');
const { validateDataTypeAttributes } = require('./dataTypeAttributeValidator');

const validDataTypeValidator = function(value) {

    if ( !fieldDataType.hasOwnProperty(value)) {
        return false;
    }

    return true;
};

const formFieldValidator = function(value, attribute, req, passes) {
    if ( !_.isArray(value)){
        passes(false, 'fields is not a list');
    }

    if ( value.length == 0 ) {
        passes(false, 'fields missing');
    }

    const fieldRules = {
        "name": "required|between:3,200",
        "displayName": "required:3,200",
        "displayOrder": "required|digits_between:0,400",
        "dataType.dataType": "required|formFieldValidDataTypeValidator",
        "dataType.required": "required|boolean",
        "dataType.dataTypeAttributes": "array"
    };

    let errors = [];
    _.forEach(value, (field) => {
        const validation = new Validator(field, fieldRules);

        if ( !validation.check() ){
            errors.push(validation.errors);
            return;
        }

        errors = _.concat(errors, validateDataTypeAttributes(field, value.dataTypeAttributes));
    });

    if ( errors.length > 0) {
        passes(false, errors);
    } else {
        passes(true);
    }
};

module.exports = {
    formFieldValidator,
    validDataTypeValidator
};
