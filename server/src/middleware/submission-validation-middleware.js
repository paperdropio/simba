const GeneralResult = require('../models/generalResult.model');
const apis = require('../dal/form.dal');
const _ = require('lodash');
const validator = require('../validations/validators/dataTypeValidator/fieldValueValidator');
const arrayUtils = require('../common/arrayUtils');

const submitForm = async (req, res, next) => {
    const {formId, data} = req.body;

    let errors = {};
    let hasError = false;
    let form = null;
    if ( !formId ) {
        errors['formId'] = ['Form is required'];
        hasError = true;
    } else {
        form = await apis.getForm(formId);

        if ( !form ){            
            errors['formId'] = ['Form is required'];
        } else if (!form.published) {
            errors['formId'] = ['Form is not published'];
        }
    }

    if ( !data || _.isEmpty(data)){
        errors['data'] = ['Data is required'];
    }
    else {
        _.merge(errors, validateRequiredFields(form, data));
        const valueErrors = validateValues(form, data);
        
        _.each(valueErrors, (err,field) => {
            if(_.has(errors, field)) {
                errors[field] = arrayUtils.join(errors[field], valueErrors[field]);
                return;
            }

            errors[field] = valueErrors[field];
        })
    }

    if (!_.isEmpty(errors)){
        res.status(412)
        .send(new GeneralResult(false, errors, "Validation failed"));
    }
    else {
        next();
    }
}

const validateRequiredFields = (form, data) => {
    let errors = {};
    _.each(form.fields, (field) => {
        if (field.dataType.required){
             if (!_.has(data, field.name) || _.isEmpty(data[field.name])){
                errors[field.name] = [`value is required`];
             }
             return;
        }
    });
    return errors;
}

const validateValues = (form, data) => {

    let errors = {};
    _.each(data, (value, field) => {
        const formField = form.fields.find((f) => f.name == field);

        if(!formField){
            return;
        }

        const fieldErrors = validator.validateFieldValue(formField, value);
        
        if ( fieldErrors && fieldErrors.length > 0 ) {
            errors[formField.name] = fieldErrors;
        }
    });

    return errors;
}

module.exports = {
    submitForm
};