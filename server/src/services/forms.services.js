
async function get(formId) {
    return formId;
}

async function create(formModel) {
    let model =  {
        'success': 'true',
        'id': '1'
    };

    return model;
}

module.exports = {
    get,
    create
}