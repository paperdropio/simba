import _ from 'lodash';

const processValidation = (f:any, rules:any) => {
    if (_.isEmpty(rules)){
        return {};
    }

    for(let d in rules){
        let fieldRules = <string[]>rules[d].split('|');
        if ( fieldRules.length == 0){
            continue;
        }

        fieldRules.forEach((r:string) => {
            runRule((f ? f[d] : undefined), r);
        })
    }
}

const runRequired = (data: any) : any => {
    if (_.isNull(data) || _.isUndefined(data) || _.isEmpty(data)){
        return 'field is required';
    }
    return '';
}

const runString = (data: any) : any => {
    if ( _.isString(data) ){
        return '';
    }

    return 'field is not a string';
}

const runEmail = (data: any) : any => {
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if(!regexp.test(data)) {
        return 'field is not an email';
    }

    return '';
}

const ruleMethods = {
    'required': runRequired,
    'string': runString,
    'email': runEmail
}

const runRule = (data:any, r:string) => {
    const index = r;
    const methodToExecute = ruleMethods[index as keyof object] as Function;
    if(!methodToExecute){
        throw 'Rule could not be executed'
    } else {
        return methodToExecute(data)
    }
}

export default processValidation;