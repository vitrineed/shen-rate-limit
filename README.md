<h1 align="center"><a href="https://github.com/meu-guru/shen-rate-limit">Shen</a></h1>

<p align="center">Simple IP/API Key rate-limiting middleware.</p>

<p align="center">
	<a href="https://github.com/meu-guru/shen-rate-limit/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
    <a href="https://github.com/meu-guru/shen-rate-limit/stargazers"><img src="https://img.shields.io/github/stars/meu-guru/shen-rate-limit.svg"></a>
    <a href="https://github.com/meu-guru/shen-rate-limit/issues"><img src="https://img.shields.io/github/issues/meu-guru/shen-rate-limit.svg"></a>
    <a href="https://www.npmjs.com/package/shen-rate-limit"><img src="https://img.shields.io/npm/v/shen-rate-limit.svg"></a>
    <a href="https://david-dm.org/meu-guru/shen-rate-limit"><img src="https://david-dm.org/meu-guru/shen-rate-limit.svg"></a>
    <a href="https://david-dm.org/meu-guru/shen-rate-limit?type=dev"><img src="https://david-dm.org/meu-guru/shen-rate-limit/dev-status.svg"></a>
</p>

* [About](#about)
* [Getting started](#start)
* [Features](#features)
* [Configuration](#configuration)
* [Documentation](#docs)
* [Contributors](#contributors)
* [License](#license)

## <a name="about"></a>About
### What is Shen Rate Limit?
A simple express rate-limiting, who uses user ip or an specific key to control access on REST APIs.


## <a name="start"></a>Getting started

### Install

```sh
$ npm install --save shen-rate-limit
```

## <a name="features"></a>Features
### Key management
With Shen you can manage your KeyChan, adding, removing and cleaning all keys.

* **Adding new key**:
```js
    var rateLimit = require('shen-rate-limit');

    app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)

    var limiter = new rateLimit({/*options*/});

    limiter.addKey('your-new-key');
```

* **Removing a key**:
```js
    var rateLimit = require('shen-rate-limit');

    app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)

    var limiter = new rateLimit({/*options*/});

    limiter.removeKey('your-new-key');
```

* **Cleaning all keys**:
```js
    var rateLimit = require('shen-rate-limit');

    app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)

    var limiter = new rateLimit({/*options*/});

    limiter.resetAll();
```


### IP Whitelist
Shen includes a whitelist system. You can configure which IP won't need to provide an API KEY, and won't consume the rate-limit(This is an array).

## <a name="docs"></a>Documentation
> Coming soon :D

## <a name="configuration"></a>Configuration

* **windowMs**: milliseconds - how long to keep records of requests in memory. Defaults to `60000` (1 minute).
* **delayAfter**: max number of connections during `windowMs` before starting to delay responses. Defaults to `1`. Set to `0` to disable delaying.  
* **delayMs**: milliseconds - how long to delay the response, multiplied by (number of recent hits - `delayAfter`).  Defaults to `1000` (1 second). Set to `0` to disable delaying.
* **max**: max number of connections during `windowMs` milliseconds before sending a 429 response. Defaults to `5`. Set to `0` to disable.
* **message**: Error message returned when `max` is exceeded. Defaults to `'Too many requests, please try again later.'`
* **statusCode**: HTTP status code returned when `max` is exceeded. Defaults to `429`.
* **headers**: Enable header to show request limit and current usage
* **allowedIp**: Whitelisted ip (an array), won't consume Rate limit and won't need an API KEY.
* **keyGet**: Function used to get user key. By default passed by header X-RateLimit-ApiKey. Defaults:
```js
function (req /*, res, next*/) {
    return req.header('X-RateLimit-ApiKey');
}
```
* **handler**: The function to execute once the max limit is exceeded. It receives the request and the response objects. The "next" param is available if you need to pass to the next middleware. Defaults:
```js
function (req, res, /*next*/) {
  res.format({
    html: function(){
      res.status(options.statusCode).end(options.message);
    },
    json: function(){
      res.status(options.statusCode).json({ message: options.message });
    }
  });
}
```
* **store**: The storage to use when persisting rate limit attempts. By default, the [MemoryStore](lib/memory-store.js) is used. It must implement the following in order to function:
```js
function SomeStore() {
    /**
      * Increments the value in the underlying store for the given key.
      * @method function
      * @param {string} key - The key to use as the unique identifier passed
      *                     down from RateLimit.
      * @param {Store~incrCallback} cb - The callback issued when the underlying
      *                                store is finished.
      */
    this.incr = function(key, cb) {
      // ...
    };

    /**
     * This callback is called by the underlying store when an answer to the
     * increment is available.
     * @callback Store~incrCallback
     * @param {?object} err - The error from the underlying store, or null if no
     *                      error occurred.
     * @param {number} value - The current value of the counter
     */

    /**
     * Resets a value with the given key.
     * @method function
     * @param  {[type]} key - The key to reset
     */
    this.resetKey = function(key) {
      // ...
    };

    /**
     * Adds a new key.
     * @method function
     * @param  {[type]} key - The key to add
     */
    this.addKey = function(key) {
      // ...
    };

    /**
     * Remove a key.
     * @method function
     * @param  {[type]} key - The key to remove
     */
    this.removeKey = function(key) {
      // ...
    };

    /**
     * Reset all keys.
     * @method function
     */
    this.resetAll = function() {
      // ...
    };
};
```

  Avaliable data stores are:
   * MemoryStore: (default)Simple in-memory option. Does not share state when app has multiple processes or servers.
   * [rate-limit-redis]: [Redis](http://redis.io/)-backed store, more suitable for large or demanding deployments.

The `delayAfter` and `delayMs` options were written for human-facing pages such as login and password reset forms.
For public APIs, setting these to `0` (disabled) and relying on only `windowMs` and `max` for rate-limiting usually makes the most sense.

## <a name="contributors"></a>Contributors
* [Joao Escudero](http://joaovescudero.me)
* [Nathan Friedly](http://nfriedly.com/)


## <a name="license"></a>License
> You can check out the full license [here](https://github.com/meu-guru/shen-rate-limit/blob/master/LICENSE)

This project is licensed under the terms of the MIT license.
