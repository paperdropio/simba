const _ = require('lodash');
const {validateDataTypeAttributes, generateMessage} = require('./fieldValidator');
import { FormFieldDataTypeAttribute } from "../../..//models/form.model";
import { FormField } from "../../..//models/form.model";
import dataTypeAttributes from "../../../enums/dataTypeAttributes";

const validAttributes = [dataTypeAttributes.min,dataTypeAttributes.max, dataTypeAttributes.validValues];

const validateField = (field: FormField, attributeToValidate: FormFieldDataTypeAttribute) => {
    return validateDataTypeAttributes(field, attributeToValidate, validAttributes);    
};

module.exports = {
    validateField
};