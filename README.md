# sp-request

The sp-request module is a wrapper on standard request package, which exposes all request functionality.

# Install
You can npm install the `sp-request` module.
```
npm i sp-request --save
```
# Usage

## Initalization

You can intialize the `sp-request` in two ways.

+ You can direct use it.

For Example -

```javascript
const request = require("sp-request");

request("http://localhost:3000",function(error, response, body) {
  
})
```

+ You can add custom config which will be pass inside headers.

```javascript
const request = require("sp-request").init({meta:{serviceName:"demo-service"},otherInformation:"Some value"});

request("http://localhost:3000",function(error, response, body) {
  
})
```
***

# Notes

+ Whenever require sp-request with init, a new instance of it will get created.
+ Without init, the sp-request will only create the single instance of request.
