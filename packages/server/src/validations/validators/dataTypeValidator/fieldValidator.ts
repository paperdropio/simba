import fieldDataType from "../../../enums/fieldDataTypes";
import dataTypeAttributes from "../../../enums/dataTypeAttributes";
import Form, {FormFieldDataTypeAttribute, FormField} from "../../../models/form.model";
let _ = require('lodash');

export const validateDataTypeAttributes = (field:FormField, attributeToValidate: FormFieldDataTypeAttribute[], validAttributes: dataTypeAttributes[]) => {

    let errors : any[] = [];
    const r : any[] = [];

    _.map(attributeToValidate, (d: any) => {
        r.push(d.attribute);
    });

    let uniqueR = _.uniq(r);

    if ( uniqueR.length != r.length){
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

const validateDataTypeAttribute = (field: FormField, attributeToValidate: FormFieldDataTypeAttribute) => {
    //valid attributes
    switch(attributeToValidate.attribute){
        case dataTypeAttributes.min:
            return validateMinDataTypeAttribute(field, attributeToValidate);
        case dataTypeAttributes.max:
            return validateMaxDataTypeAttribute(field, attributeToValidate);
        case dataTypeAttributes.validValues:
            return validateValidValuesDataTypeAttribute(field, attributeToValidate);
        default: 
            return [];
    }
};

const validateMinDataTypeAttribute = (field: FormField, attributeToValidate: FormFieldDataTypeAttribute) => {
    let errors = [];
    if (!_.isNumber(attributeToValidate.attributeValue) )
        errors.push(`Invalid data attribute for field ${field.name}, min attribute value is mising`);
    else {
        const value = _.toNumber(attributeToValidate.attributeValue);
        
        if ( field?.dataType?.dataType == fieldDataType.string && value < 0) {
            errors.push(`Invalid data attribute for field ${field.name}, min attribute value cannot be less than 0 for a string data type`);
        }
    }
    
    return errors;
}

const validateMaxDataTypeAttribute = (field: FormField, attributeToValidate: FormFieldDataTypeAttribute) => {
    let errors = [];
    if (!_.isNumber(attributeToValidate.attributeValue) )
        errors.push(`Invalid data attribute for field ${field.name}, max attribute value is mising`);
    else {
        const value = _.toNumber(attributeToValidate.attributeValue);

        if ( field?.dataType?.dataType == fieldDataType.string && value < 0) {
            errors.push(`Invalid data attribute for field ${field.name}, max attribute value cannot be less than 0 for a string data type`);
        }
    }
    
    return errors;
}

const validateValidValuesDataTypeAttribute = (field: FormField, attributeToValidate: FormFieldDataTypeAttribute) => {
    let errors = [];
    if (!_.isArray(attributeToValidate.attributeValue) || attributeToValidate.attributeValue.length === 0 )
        errors.push(`Invalid data attribute for field ${field.name}, valid value attribute value is mising or invalid`);
    else {
        const value = _.isArray(attributeToValidate.attributeValue);

        if ( (field?.dataType?.dataType == fieldDataType.number ||
            field?.dataType?.dataType == fieldDataType.currency) && 
                attributeToValidate.attributeValue.some((d:any) => !_.isNumber(parseInt(d))) ) {            
            errors.push(`Invalid data attribute for field ${field.name}, some valid values are invalid`);
        }
    }
    
    return errors;
}

export const generateMessage = (formField: FormField, message: string) => {
    if (message){
        return `${formField?.name} ${message}`;
    }

    return;
}