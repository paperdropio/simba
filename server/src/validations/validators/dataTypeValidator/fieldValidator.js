let _ = require('lodash');

const validateDataTypeAttributes = (field, attributeToValidate, validAttributes) => {

    let errors = [];
    const r = [];
    _.map(attributeToValidate, (d) => {
        r.push(d.attributeType);
    });

    let uniqueR = _.uniq(r);

    if ( uniqueR.length != r){
        errors.push(`Invalid data attribute for field ${field.name}, duplicate attributes are not allowed`);
    }

    let lst = _.difference(uniqueR, validAttributes);

    if(lst.length > 0){
        errors.push(`Invalid data attribute for field ${field.name}, valid attribute ${validAttributes}`);
    }

    attributeToValidate.forEach(element => {
        errors = _.concat(errors, validateDataTypeAttribute(field, element));
    });

    return errors;
}

const validateDataTypeAttribute = (field, attributeToValidate) => {
    //valid attributes
    switch(attributeToValidate.attributeType){
        case "min":
            return validateMinDataTypeAttribute(field, attributeToValidate);
        case "max":
            return validateMaxDataTypeAttribute(field, attributeToValidate);
        case "validValues":
            return validateValidValuesDataTypeAttribute(field, attributeToValidate);
        default: 
            return [];
    }
};

const validateMinDataTypeAttribute = (field, attributeToValidate) => {
    let errors = [];
    if (!_.isNumber(attributeToValidate.value) )
        errors.push(`Invalid data attribute for field ${field.name}, min attribute value is mising`);
    else {
        const value = _.toNumber(attributeToValidate.value);

        if ( field.dataType == fieldDataType.string && value < 0) {
            errors.push(`Invalid data attribute for field ${field.name}, min attribute value cannot be less than 0 for a string data type`);
        }
    }
    
    return errors;
}

const validateMaxDataTypeAttribute = (field, attributeToValidate) => {
    let errors = [];
    if (!_.isNumber(attributeToValidate.value) )
        errors.push(`Invalid data attribute for field ${field.name}, max attribute value is mising`);
    else {
        const value = _.toNumber(attributeToValidate.value);

        if ( field.dataType == fieldDataType.string && value < 0) {
            errors.push(`Invalid data attribute for field ${field.name}, max attribute value cannot be less than 0 for a string data type`);
        }
    }
    
    return errors;
}

const validateValidValuesDataTypeAttribute = (field, attributeToValidate) => {
    let errors = [];
    if (!_.isNumber(attributeToValidate.value) || !_.isArray(attributeToValidate.value) )
        errors.push(`Invalid data attribute for field ${field.name}, valid value attribute value is mising or invalid`);
    else {
        const value = _.isArray(attributeToValidate.value);

        if ( (field.dataType == fieldDataType.number ||
            field.dataType == fieldDataType.currency) && attributeToValidate.value.some((d) => !_.isNumber(d)) ) {            
            errors.push(`Invalid data attribute for field ${field.name}, some valid values are invalid`);
        }
    }
    
    return errors;
}

const generateMessage = (formField, message) => {
    if (message){
        return `${formField.name} ${message}`;
    }

    return;
}

module.exports = {
    validateDataTypeAttributes,
    generateMessage
};