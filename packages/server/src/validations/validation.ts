const Validator = require('validatorjs');
import { formFieldValidator } from "./validators/formFieldValidator";
import { validDataTypeValidator } from "./validators/formFieldValidator";
import { formIdValidator } from "./validators/formIdValidator";
import { submissionFieldValidator } from "./validators/submissionFieldValidator";
let _ = require('lodash');
import Form from '../models/form.model';
import { isPropertyAccessOrQualifiedName } from "typescript";

Validator.registerAsync("formFieldValidator", formFieldValidator);
Validator.registerAsync("formFieldValidDataTypeValidator", validDataTypeValidator, "Data Type not valid");

Validator.registerAsync("formIdValidator", formIdValidator);
Validator.registerAsync("submissionFieldValidator", submissionFieldValidator);

const validator = async (body: any, rules: any, customMessages: any, callback: any) => {
    const validation = new Validator(body, rules, customMessages);
    
    await validation.checkAsync(() => callback(null, true), (errors: any) => callback(validation.errors, false));
};

/*export const validateSaveFormRequest = async (formToValidate: any) => {
    
    return {result: false, err: {}}
}

export const validateCreateFormRequest = async (formToValidate: any) => {
    let form = <Form>formToValidate;

    const validationRule = {
        "name": "required|string",
        "header": "required|string",
        "description": "required|string",
        "email": "required|string|email"
    }

    validator(formToValidate, validationRule, {}, (err:any, success:boolean) => {

    })

    const err = processValidation(form, validationRule);

    return {result: _.isEmpty(err), err: err}
}*/

export default validator;