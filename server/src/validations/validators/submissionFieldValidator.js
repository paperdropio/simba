let _ = require('lodash');
const formApis = require('../../dal/form.dal');
 
const submissionFieldValidator = async (value, attribute, req, passes) => {
    
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
    submissionFieldValidator
};