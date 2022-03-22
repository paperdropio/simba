const validator = require('../validations/validation');
const GeneralResult = require('../models/generalResult.model');
const apis = require('../dal/form.dal');
const _ = require('lodash');

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
        } else if (form.published) {
            errors['formId'] = ['Form is not published'];
        }
    }

    if ( !data || !_.isArray(data)){
        errors['data'] = ['Data is required'];
    }
    else {
        _.concat(errors, validateRequiredFields(form, data));
        _.concat(errors, validateValues(form, data));
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
        if (field.required){
             if (!_.has(data, field.name) || _.isEmpty(data[field.name])){
                errors[field.name] = [`${field.name} is required`];
             }
             return;
        }
    });
    return errors;
}

const validateValues = (form, data) => {
    
    let errors = {};
    _.each(data, (field) => {
        if (field.required){
             if (!_.has(data, field.name) || _.isEmpty(data[field.name])){
                errors[field.name] = [`${field.name} is required`];
             }
             return;
        }
    });
    return errors;
}

module.exports = {
    submitForm
};