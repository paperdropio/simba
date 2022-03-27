const _ = require("lodash");
const { ObjectId } = require('mongodb');

class Submission {
    constructor(model) {
        if ( !model){
            return;
        }

        this.formId = model.formId;
        this._id = model._id;
        this.data = sanitize(model.data);
        this.submittedOn = model.submittedOn;
    }
}

sanitize = (obj) => {
    let result = {};
    _.each(obj, (v, k) => {
        if ( !k || _.isFunction(v) || k.startsWith('_')) {
            return;
        }
        result[k] = v;
    });

    return result;
}

module.exports = Submission;