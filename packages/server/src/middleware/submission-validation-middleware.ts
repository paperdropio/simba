const _ = require('lodash');
const validator = require('../validations/validators/dataTypeValidator/fieldValueValidator');
const arrayUtils = require('../common/arrayUtils');
import Form, { FormField } from "../models/form.model";
import GeneralResult from '../models/generalResult.model';
import { getForm } from '../dal/form.dal';

const submitForm = async (req: any, res: any, next: any) => {
    const { formId, data } = req.body;

    let errors: any = {};
    let form: Form | null;

    let canContinue = true;
    if (!formId) {
        errors['formId'] = ['Form is required'];
        canContinue = false;
    } 

    if ( !data || _.isEmpty(data)){
        errors['data'] = ['Data is required'];
        canContinue = false;
    }
    
    if (canContinue) {
            form = await getForm(formId);

        if (!form) {
            errors['formId'] = ['Form is required'];
        } else {
            if (!form.published) {
                errors['formId'] = ['Form is not published'];
            }
            
            _.merge(errors, validateRequiredFields((<Form>form), data));
            const valueErrors = validateValues((<Form>form), data);

            _.each(valueErrors, (err: any, field: any) => {
                if (_.has(errors, field)) {
                    errors[field] = arrayUtils.join(errors[field], valueErrors[field]);
                    return;
                }

                errors[field] = valueErrors[field];
            })

        }
    }

    if (!_.isEmpty(errors)) {
        res.status(412)
            .send(new GeneralResult(false, errors, "Validation failed"));
    }
    else {
        next();
    }
}

const validateRequiredFields = (form: Form, data: any): any => {
    let errors: any = {};
    _.each(form?.fields, (field: FormField) => {
        if (field?.dataType?.required || false) {
            if (!_.has(data, field.name) || _.isEmpty(data[field?.name || ""])) {
                errors[field?.name || ""] = [`value is required`];
            }
            return;
        }
    });
    return errors;
}

const validateValues = (form: Form, data: any) => {

    let errors: any = {};
    _.each(data, (value: any, field: FormField) => {
        const formField = form.fields.find((f) => f.name == field);

        if (!formField) {
            return;
        }

        const fieldErrors = validator.validateFieldValue(formField, value);

        if (fieldErrors && fieldErrors.length > 0) {
            errors[formField?.name || ""] = fieldErrors;
        }
    });

    return errors;
}

module.exports = {
    submitForm
};