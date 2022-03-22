const { ObjectId } = require("mongodb");
const Form = require("../models/form.model");
const moment = require('moment');

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
        if ( form.fields.length > 0) {
            const result = await dbo.collection("forms").updateOne({ _id: form.Id }, { $set: {  published: true, 
                                                                                        publishedDate: moment().utc().toISOString() 
                                                                                    }}, {upsert: false});
            
            return { success: result.acknowledged && result.matchedCount == 1, totalModified: result.modifiedCount };
        } else {
            return { success: false, message: 'Form not complete' };
        }
    }

    return { success: false, totalModified: 0 };
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
        return new Form(result, result._id);
    }

    return null;
}

module.exports = {
    createForm,
    getForm,
    saveForm,
    publishForm
}