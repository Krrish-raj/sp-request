const getNamespace = require('continuation-local-storage').getNamespace;
const session      = getNamespace('slicepay-node-application');

const updateHeader = (args,config) => {
    let object = typeof args[0]==="object"?args[0]:typeof args[1]==="object"?args[1]:{};
    let { headers } = object;
    headers = mergeObject(headers,config);
    if(!config) {
        headers = {
            ...headers,
            reqId: session&&session.hasOwnProperty("reqId")?session.get("reqId"):"NA"
        }
    }
    object.headers = headers;
    if(typeof args[0]==="object")
        args[0] = object;
    else if(typeof args[1]==="object")
        args[1] = object;
    else {
        args[2] = args[1];
        args[1] = object;
    }
    return args;
};

const mergeObject = (obj1, obj2) => {
    if(!obj1) {
        obj1 = {};
    }
    if(!obj2) {
        obj2 = {};
    }
    return {...obj1, ...obj2}
};

exports.updateHeader = updateHeader;