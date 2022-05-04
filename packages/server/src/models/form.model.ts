import fieldDataType from "../enums/fieldDataTypes";
import dataTypeAttributes from "../enums/dataTypeAttributes";


export default class Form {

    _id?: string;
    name?: string;
    header?: string;
    description?: string;
    email?: string;
    invalidValueMessage?: string;
    fields: FormField[] = [];
    published?: string;
    lastSavedOn?: string;
    publishSecrets?: FormPublishSecrets;

    constructor(model: any, id?: string) {
        if ( !model){
            return;
        }
        
        this._id = (id ?? model._id ?? model.id);
        this.name = model.name;
        this.header = model.header;
        this.description = model.description;
        this.email = model.email;
        this.invalidValueMessage = model.invalidValueMessage;        
        this.published = model.published;
        this.lastSavedOn = model.lastSavedOn;
        this.publishSecrets = new FormPublishSecrets(model.publishSecrets);
        
        if ( model.fields && Array.isArray(model.fields)){
            model.fields.forEach((d:any) => {
                this.fields.push(new FormField(d));
            });
        }
    }
}

export class FormField {
    name?: string;
    displayName?: string;
    displayOrder?: number;
    dataType?: FormFieldDataType;

    constructor(model: any) {
        this.name = model.name;
        this.displayName = model.displayName;
        this.displayOrder = model.displayOrder;
        this.dataType = new FormFieldDataType(model.dataType);
    }
}

export class FormFieldDataType {
    dataType: fieldDataType;
    required: boolean;
    dataTypeAttribute: FormFieldDataTypeAttribute[];

    constructor(model: any) {
        this.dataType = model.dataType;
        this.required = model.required;
        this.dataTypeAttribute = [];

        if ( model.dataTypeAttribute && Array.isArray(model.dataTypeAttribute)){
            model.dataTypeAttribute.forEach((d:any) => {
                this.dataTypeAttribute.push(new FormFieldDataTypeAttribute(d));
            });
        }
    }
}

export class FormFieldDataTypeAttribute {
    attribute: dataTypeAttributes;
    attributeValue: any;

    constructor(model: any) {
        this.attribute = model.attribute;
        this.attributeValue = model.attributeValue;
    }
}

export class FormPublishSecrets {
    secret?: string;
    constructor(model: any) {
        if (model){
            this.secret = model.secret;
        }
    }
}

