const { getForm, createForm, saveForm, publishForm } = require('../dal/form.dal');


function get(formId) {
    const result = getForm(formId);
    
    return result;
}

async function create(model) {
    const result = await createForm(model);

    return result;
}

async function publish(formId) {
    const result = await publishForm(formId);

    return result;
}

async function save(model) {
    const result = await saveForm(model);

    return result;
}

module.exports = {
    get,
    create,
    save,
    publish
}