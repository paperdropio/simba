let _ = require('lodash');
const formApis = require('../../dal/form.dal');
 
const formIdValidator = async (value, attribute, req, passes) => {
    console.log(value);
    const form = await formApis.getForm(value);
    
    if  ( !form ){
        passes(false, 'Form could not be found');
        return;
    }
    else if ( !form.published) {
        passes(false, 'Form not published');
        return;
    }

    passes(true);
};

module.exports = {
    formIdValidator
};