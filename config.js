/*globals define*/

module.exports.getConfig = function () {
    'use strict';
    return {
        port: 8888,
        autorecconnect: true,
        reconndelay: 1000,
        reconnamount: 1000,

        //used by the server
        debug: false,
        loglevel: 1, // 5 = ALL, 4 = DEBUG, 3 = INFO, 2 = WARNING, 1 = ERROR, 0 = OFF
        logfile: 'server.log',

        mongoip: '127.0.0.1',
        mongoport: 27017,
        mongodatabase: 'multi',
        //mongouser: TODO by default we do not expect mongodb to use authentication
        //mongopwd: TODO by default we do not expect mongodb to use authentication
        authentication: false,
        httpsecure: false,
        guest: false,
        sessioncookieid: 'webgmeSid',
        sessioncookiesecret: 'meWebGMEez',

        paths: {
               //executor: './node_modules/webgme/src/middleware/executor'
            },
        pluginBasePaths: [
               './node_modules/webgme/src/plugin/coreplugins',
               './src/plugins/test_plugin'
            ],
        decoratorpaths: [],
        visualizerDescriptors: [],
        addonBasePaths: [],
        rextrast: {},

        // Available choices are: rand160Bits, asmSHA1, ZSSHA, plainSHA1 (default)
        storageKeyType: 'asmSHA1'
    };
};
