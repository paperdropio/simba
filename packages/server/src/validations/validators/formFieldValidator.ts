import fieldDataType from "../../enums/fieldDataTypes";
import { FormField } from "../../models/form.model";
const Validator = require('validatorjs');
const _ = require('lodash');
import { validateDataTypeAttributes } from './dataTypeAttributeValidator';
import { isValueInEnum } from "../../common/arrayUtils";

export const validDataTypeValidator = function(value:string) {
    return isValueInEnum(fieldDataType, value);
};

export const formFieldValidator = function(value: FormField[], attribute: any, req: any, passes: any) {
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

    let errors : string[] = [];
    _.forEach(value, (field: FormField) => {
        const validation = new Validator(field, fieldRules);

        if ( !validation.check() ){
            errors.push(validation.errors);
            return;
        }

        console.log(errors);

        errors = _.concat(errors, validateDataTypeAttributes(field, (field.dataType?.dataTypeAttribute || [])));
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
