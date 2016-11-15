'use strict';
function MemoryStore(windowMs) {
  var keychan = {};

  this.incr = function(key, cb) {
    if (keychan[key] >= 0) {
      keychan[key]++;
      cb(null, keychan[key]);
    } else {
      cb('Invalid API Key');
    }
  };

  // reset all keys, without losing the key
  this.resetAll = function() {
    for(let key in keychan){
      keychan[key] = 0;
    }
  };

  // export an API to allow key from one or all IPs to be reset
  this.resetKey = function(key) {
  	delete keychan[key];
  };

	this.addKey = function(key){
		keychan[key] = 0;   
	}

  // simply reset ALL keychan every windowMs
  setInterval(this.resetAll, windowMs).unref();
}

module.exports = MemoryStore;
