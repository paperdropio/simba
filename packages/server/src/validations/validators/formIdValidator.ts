const _ = require('lodash');
import * as formApis from '../../dal/form.dal';
 
export const formIdValidator = async (value:string, attribute: any, req: any, passes: any) => {
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