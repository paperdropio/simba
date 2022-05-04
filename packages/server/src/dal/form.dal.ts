import DBConnection from '../models/dbConnection';
import Form from "../models/form.model";
const moment = require('moment');
const _ = require('lodash');
const {v4:uuid} = require("uuid")
import getNewId from '../common/UniqueIdGenerator';

const createForm = async (formModel:Form) : Promise<any> => {
    let dbo = <any>DBConnection.getInstance().db;
    debugger;
    formModel._id = getNewId();
     const result = await dbo.collection("forms").insertOne(formModel);

    return { success: result.acknowledged, insertedId: result.insertedId };
}

export const publishForm = async (formId: string) : Promise<any> => {
    let dbo = <any>DBConnection.getInstance().db;

    const form = await getForm(formId);

    const result = false;
    if ( form) {
        const publishSecret = uuid();

        const result = await dbo.collection("forms").updateOne({ _id: form._id }, 
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

export const saveForm = async (formModel: Form) : Promise<any> => {
    let dbo = <any>DBConnection.getInstance().db;

    const result = await dbo.collection("forms").replaceOne({ _id: formModel._id }, formModel);
    return { success: result.acknowledged && result.matchedCount == 1, totalModified: result.modifiedCount };
}

export const getForm = async (formId:string) : Promise<Form | null> => {
    
    let dbo = <any>DBConnection.getInstance().db;
    let result = await dbo.collection("forms").findOne({ _id: formId });

    if (result) {
        let form = new Form(result, result._id);
        form = sanitizeForm(form);

        return form;
    }

    return null;
}

const sanitizeForm = (form: Form) => {
    return _.omit(form, ['publishSecrets']);
}

module.exports = {
    createForm,
    getForm,
    saveForm,
    publishForm
}