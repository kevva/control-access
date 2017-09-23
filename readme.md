# control-access [![Build Status](https://travis-ci.org/kevva/control-access.svg?branch=master)](https://travis-ci.org/kevva/control-access)

> Easy CORS handling


## Install

```
$ npm install control-access
```


## Usage

```js
const controlAccess = require('control-access');

module.exports = (req, res) => {
	controlAccess()(req, res);
	res.end('unicorns');
};
```


## API

### controlAccess([options])(request, response)

#### options

Type: `Object`

##### allowCredentials

Type: `boolean`

[`Access-Control-Allow-Credentials`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials) indicates whether or not the response to the request can be exposed when the credentials flag is true.

Can be set globally with the `ACCESS_ALLOW_CREDENTIALS` environment variable. Possible values are `1` and `0`.

##### allowHeaders

Type: `Array`

[`Access-Control-Allow-Headers`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers) is used in response to a preflight request to indicate which HTTP headers can be used when making the actual request.

Can be set globally with the `ACCESS_ALLOW_HEADERS` environment variable using a comma delimited string.

##### allowMethods

Type: `Array`

[`Access-Control-Allow-Methods`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Methods) specifies the method or methods allowed when accessing the resource.

Can be set globally with the `ACCESS_ALLOW_METHODS` environment variable using a comma delimited string.

##### allowOrigin

Type: `string`

[`Access-Control-Allow-Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin) specifies a URI that may access the resource.

Can be set globally with the `ACCESS_ALLOW_ORIGIN` environment variable.

##### maxAge

Type: `number`

[`Access-Control-Max-Age`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age) indicates how long the results of a preflight request can be cached.

Can be set globally with the `ACCESS_MAX_AGE` environment variable.

#### request

Type: `Object`

The `request` object.

#### response

Type: `Object`

The `response` object.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
