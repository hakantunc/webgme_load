/*globals WebGMEGlobal*/

var config = require('./config.js').getConfig(),
    webgme = require('webgme');

// updating default configuration with ours
WebGMEGlobal.setConfig(config);

// standalone server uses WebGMEGlobal.getConfig() if no configuration defined
var myServer = new webgme.standaloneServer();
myServer.start();
