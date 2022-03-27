const _ = require('lodash');
const stringDataTypeValidator = require('./dataTypeValidator/stringDataTypeValidator');
const numberDataTypeValidator = require('./dataTypeValidator/numberDataTypeValidator');
const currencyDataTypeValidator = require('./dataTypeValidator/currencyDataTypeValidator');
 
const validateDataTypeAttributes = (field, attributeToValidate) => {
    if(!attributeToValidate || !_.isArray(attributeToValidate) || attributeToValidate.length == 0){
        return [];
    }

    if ( attributeToValidate != null) {
        switch(field.dataType){
            case "string":
                return stringDataTypeValidator.validateField(field, attributeToValidate);
            case "number":
                return numberDataTypeValidator.validateField(field, attributeToValidate);
            case "currency":
                return currencyDataTypeValidator.validateField(field, attributeToValidate);
            default: 
                return [];
        }
    }
};

module.exports = {
    validateDataTypeAttributes
};