'use strict';
const jsonfile = require('jsonfile');
const db = require('./db.json');

function MemoryStore(windowMs) {
  var keychan = db;

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
    for(var key in keychan){
      keychan[key] = 0;
    }
    jsonfile.writeFileSync(__dirname + '/db.json', keychan);     
  };

  // export an API to allow key from one or all IPs to be reset
  this.resetKey = function(key) {
  	keychan[key] = 0;
    jsonfile.writeFileSync(__dirname + '/db.json', keychan);     
  };

	this.addKey = function(key){
		keychan[key] = 0;
    jsonfile.writeFileSync(__dirname + '/db.json', keychan); 
	};

  this.removeKey = function(key){
    delete keychan[key];
    jsonfile.writeFileSync(__dirname + '/db.json', keychan);     
  }

  // simply reset ALL keychan every windowMs
  setInterval(this.resetAll, windowMs).unref();
}

module.exports = MemoryStore;
