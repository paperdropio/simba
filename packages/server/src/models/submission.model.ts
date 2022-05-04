const _ = require('lodash')

export default class Submission {
    formId?: string;
    _id?: string;
    data: any;
    submittedOn?: Date;

    constructor(model: any) {
        if ( !model){
            return;
        }

        this.formId = model.formId;
        this._id = model._id;
        this.data = sanitize(model.data);
        this.submittedOn = model.submittedOn;        
    }
}

const sanitize = (obj: any) => {
    let result: any = {};
    _.each(obj, (v:string, k: any) => {
        if ( !k || _.isFunction(v) || k.startsWith('_')) {
            return;
        }
        result[k] = v;
    });

    return result;
}