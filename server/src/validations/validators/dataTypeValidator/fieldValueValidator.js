const _ = require('lodash');
const fieldDataType = require('../../../enums/fieldDataTypes');
const dataTypeAttributes = require('../../../enums/dataTypeAttributes');
const arrayUtils = require('../../../common/arrayUtils');

const validateFieldValue = (field, value) => {
    let errors = [];

    //validate field value against the field data type
    if ( field.dataType.dataType == fieldDataType.string) {
        errors = _.concat(errors, validateStringFieldValue(field, value));
    }
    else if ( field.dataType.dataType == fieldDataType.number || 
                field.dataType == fieldDataType.currency) {
        errors = _.concat(errors, validateNumberFieldValue(field, value));
    }

    //validate field value against all the data attributes
    errors = _.union(errors, validateFieldValueAgainstAttributes(field, value));

    return errors;
}

const validateStringFieldValue = (formField, value) => {
    if (value && !_.isString(value)){
        return ['value is not valid'];
    }

    return [];
}

const validateNumberFieldValue = (formField, value) => {
    if (value && !_.isNumber(_.toNumber(value))){
        return ['value is not valid'];
    }

    return [];
}

const validateFieldValueAgainstAttributes = (field, value) => {
    let errors = [];
    _.each(field.dataType.dataTypeAttribute, (attributeToValidate) => {        
        errors = arrayUtils.join(errors, validateFieldValueAgainstAttribute(field, value, attributeToValidate));
    });
    return errors;
}

const validateFieldValueAgainstAttribute = (field, value, attributeToValidate) => {

    let errors = [];

    switch ( field.dataType.dataType) {
        case fieldDataType.string:
            errors = arrayUtils.join(errors, validateStringFieldValueAgainstAttribute(field, value, attributeToValidate));
            break;
        case fieldDataType.number:
        case fieldDataType.currency:
            errors = arrayUtils.join(errors, validateNumberFieldValueAgainstAttribute(field, value, attributeToValidate));
            break;
    }


    return errors;
}

const validateStringFieldValueAgainstAttribute = (field, value, attributeToValidate) => {

    let errors = [];

    switch ( attributeToValidate.attribute) {
        case dataTypeAttributes.max:
            if (value && (value ? 0 : value.length) > _.toNumber(attributeToValidate.attributeValue)){
                errors.push(`length cannot be greater than ${attributeToValidate.attributeValue}`)
            }
            break;
        case dataTypeAttributes.min:
            if (value && (value ? value.length : 0) < _.toNumber(attributeToValidate.attributeValue)){
                errors.push(`length should be atleast ${attributeToValidate.attributeValue}`)
            }
            break;
        case dataTypeAttributes.validValues:
            if (_.toArray(attributeToValidate.attributeValue).indexOf(value) == -1) {
                errors.push(`value is not in the valid list`)
            }
            break;
    }

    return errors;
}

const validateNumberFieldValueAgainstAttribute = (field, value, attributeToValidate) => {

    let errors = [];

    const valueNumber = _.toNumber(value);
    if ( valueNumber )
    {
        switch ( attributeToValidate.attribute) {
            case dataTypeAttributes.max:
                if (valueNumber > _.toNumber(attributeToValidate.attributeValue)){
                    errors.push(`length cannot be greater than ${attributeToValidate.attributeValue}`)
                }
                break;
            case dataTypeAttributes.min:
                if (valueNumber < _.toNumber(attributeToValidate.attributeValue)){
                    errors.push(`length should be atleast ${attributeToValidate.attributeValue}`)
                }
                break;
            case dataTypeAttributes.validValues:   
                console.log(_.toArray(attributeToValidate.attributeValue));
                if (_.toArray(attributeToValidate.attributeValue).indexOf(value) == -1) {
                    errors.push(`value is invalid`)
                }
                break;
        }
    }

    return errors;
}

module.exports = {
    validateFieldValue
};