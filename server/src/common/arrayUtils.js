const _ = require('lodash');

const join = (arr1, arr2) => {
    if( !arr1 && !arr2){
        return [];
    }

    if (!arr1 || arr1.length == 0){
        return arr2;
    }

    if (!arr2 || arr2.length == 0){
        return arr1;
    }

    return _.concat(arr1, arr2);
}

module.exports = {
    join
}