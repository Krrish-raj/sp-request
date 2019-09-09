const requestIntercepter = require("./requestIntercepter");

let request = requestIntercepter();

request.init = (config) => {
    return requestIntercepter(config);
};

module.exports = request;