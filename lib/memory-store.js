'use strict';
function MemoryStore(windowMs) {
  var hits = {};

  this.incr = function(key, cb) {
    if (hits[key] >= 0) {
      hits[key]++;
      cb(null, hits[key]);
    } else {
      cb('err');
    }
  };

  this.resetAll = function() {
    hits = {};
  };

  // export an API to allow hits from one or all IPs to be reset
  this.resetKey = function(key) {
  	delete hits[key];
  };

	this.addKey = function(key){
		hits[key] = 0;   
	}

  // simply reset ALL hits every windowMs
  setInterval(this.resetAll, windowMs).unref();
}

module.exports = MemoryStore;
