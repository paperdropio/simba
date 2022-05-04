const _ = require('lodash');

export const join = (arr1:[], arr2:[]) : [] => {
    return _.concat(arr1, arr2);
}

export const isValueInEnum = (lst:any, value:string) : boolean => {
    if ( !lst || !value ){
        return false;
    }
    const parsedValue = Object.values(lst).find(x => x === value) 

    return !parsedValue ? false : true;
}