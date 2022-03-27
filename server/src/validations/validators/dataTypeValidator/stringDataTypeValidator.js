const _ = require('lodash');
const {validateDataTypeAttributes, generateMessage} = require('./fieldValidator');
const dataTypeAttributes = require('../../../enums/dataTypeAttributes');

const validAttributes = [dataTypeAttributes.min, dataTypeAttributes.max, dataTypeAttributes.validValues];

const validateField = (field, attributeToValidate) => {
    return validateDataTypeAttributes(field, attributeToValidate, validAttributes);    
};

module.exports = {
    validateField
};