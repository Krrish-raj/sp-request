const request      = require("request");

const { updateHeader } = require("./requestUpdater");

const allowUpdate  = {
    "POST": 1,
    "GET": 1,
    "PUT": 1,
    "PATCH": 1,
    "DELETE": 1
}

var requestObject;
var config;
var handler;

const requestIntercepter = (config) => {
    config     = config;
    handler    = {
        get: (obj, prop) => {
            return (...args) => {
                if(allowUpdate[prop.toUpperCase()]) {
                    args = updateHeader(args,config);
                }
                return obj[prop](...args);
            };
        },
        apply: (obj, thisArg, args) => {
            args = updateHeader(args,config);
            return obj(...args);
        }
    };
    requestObject = requestObject&&!config?requestObject:new Proxy(request, handler);
    return requestObject;
}

module.exports = requestIntercepter;