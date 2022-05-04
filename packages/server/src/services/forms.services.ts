import Form from "../models/form.model";

const { getForm, createForm, saveForm, publishForm } = require('../dal/form.dal');

export const get = (formId: string) => {
    const result = getForm(formId);
    
    return result;
}

export const create = async (model: Form) => {
    const result = await createForm(model);

    return result;
}

export async function publish(formId: string) {
    const result = await publishForm(formId);

    return result;
}

export async function save(model: Form) {
    const result = await saveForm(model);

    return result;
}