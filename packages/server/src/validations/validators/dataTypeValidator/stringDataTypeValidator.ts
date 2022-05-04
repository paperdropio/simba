const _ = require('lodash');
import {validateDataTypeAttributes, generateMessage} from './fieldValidator';
import dataTypeAttributes from '../../../enums/dataTypeAttributes';
import { FormField, FormFieldDataTypeAttribute } from '../../../models/form.model';

const validAttributes = [dataTypeAttributes.min, dataTypeAttributes.max, dataTypeAttributes.validValues];

const validateField = (field: FormField, attributeToValidate: FormFieldDataTypeAttribute[]) => {
    return validateDataTypeAttributes(field, attributeToValidate, validAttributes);    
};

module.exports = {
    validateField
};