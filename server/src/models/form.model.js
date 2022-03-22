const _ = require("lodash");
const { ObjectId } = require('mongodb');

class Form {
    constructor(model, id) {
        if ( !model){
            return;
        }
        
        this.Id = id ? id : model.Id;
        this.name = model.name;
        this.header = model.header;
        this.description = model.description;
        this.email = model.email;
        this.invalidValueMessage = model.invalidValueMessage;
        this.fields = [];
        this.published = model.published;

        if ( model.fields && _.isArray(model.fields)){
            _.forEach(model.fields, (d) => {
                this.fields.push(new FormField(d));
            });
        }
    }
}

class FormField {
    constructor(model) {
        this.name = model.name;
        this.displayName = model.displayName;
        this.displayOrder = model.displayOrder;
        this.dataType = new FormFieldDataType(model.dataType);
    }
}

class FormFieldDataType {
    constructor(model) {
        this.dataType = model.dataType;
        this.required = model.required;
        this.dataTypeAttribute = [];

        if ( model.dataTypeAttributes && _.isArray(model.dataTypeAttributes)){
            _.forEach(model.dataTypeAttributes, (d) => {
                this.dataTypeAttribute.push(new FormFieldDataTypeAttribute(d));
            });
        }
    }
}

class FormFieldDataTypeAttribute {
    constructor(model) {
        this.attribute = model.attribute;
        this.attributeValue = model.attributeValue;
    }
}

module.exports = Form;