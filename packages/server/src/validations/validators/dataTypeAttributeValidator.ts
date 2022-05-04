import fieldDataType from "../../enums/fieldDataTypes";
import { FormField, FormFieldDataTypeAttribute } from "../../models/form.model";

const _ = require('lodash');
const stringDataTypeValidator = require('./dataTypeValidator/stringDataTypeValidator');
const numberDataTypeValidator = require('./dataTypeValidator/numberDataTypeValidator');
const currencyDataTypeValidator = require('./dataTypeValidator/currencyDataTypeValidator');
 
export const validateDataTypeAttributes = (field: FormField, attributeToValidate: FormFieldDataTypeAttribute[]) => {
    if(!attributeToValidate || !_.isArray(attributeToValidate) || attributeToValidate.length == 0){
        return [];
    }

    if ( attributeToValidate != null) {
        switch(field.dataType?.dataType){
            case fieldDataType.string:
                return stringDataTypeValidator.validateField(field, attributeToValidate);            
            case fieldDataType.number:
                return numberDataTypeValidator.validateField(field, attributeToValidate);            
            case fieldDataType.currency:
                return currencyDataTypeValidator.validateField(field, attributeToValidate);
            default: 
                return [];
        }
    }
};