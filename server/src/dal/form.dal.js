const { ObjectId } = require("mongodb");
const Form = require("../models/form.model");
const moment = require('moment');
const _ = require('lodash');
const {v4:uuid} = require("uuid")

async function createForm(formModel) {
    let dbo = global.db;

    formModel._id = ObjectId();
     const result = await dbo.collection("forms").insertOne(formModel);

    return { success: result.acknowledged, insertedId: result.insertedId };
}

async function publishForm(formId) {
    let dbo = global.db;

    const form = await getForm(formId);

    const result = false;
    if ( form) {
        const publishSecret = uuid();

        const result = await dbo.collection("forms").updateOne({ _id: form.Id }, 
            { $set: {  
                published: true, 
                publishedDate: moment().utc().toISOString(), 
                publishSecrets: { secret: publishSecret }
            }}, { upsert: false });
            
        return { success: result.acknowledged && result.matchedCount == 1, 
                 totalModified: result.modifiedCount, 
                 publishSecret: publishSecret 
                };
    } else {
        return { success: false, message: 'Form not complete' };
    }
}

async function saveForm(formModel) {
    let dbo = global.db;

    const result = await dbo.collection("forms").replaceOne({ _id: ObjectId(formModel.Id) }, formModel);

    return { success: result.acknowledged && result.matchedCount == 1, totalModified: result.modifiedCount };
}

async function getForm(formId) {
    let dbo = global.db;

    let result = await dbo.collection("forms").findOne({ _id: ObjectId(formId) });

    if (result) {
        let form = new Form(result, result._id);
        form = sanitizeForm(form);

        return form;
    }

    return null;
}

const sanitizeForm = (form) => {
    return _.omit(form, ['publishSecrets']);
}

module.exports = {
    createForm,
    getForm,
    saveForm,
    publishForm
}