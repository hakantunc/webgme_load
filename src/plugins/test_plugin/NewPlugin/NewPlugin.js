/**
* Generated by PluginGenerator from webgme on Tue Feb 24 2015 17:46:21 GMT-0600 (CST).
*/

define(['plugin/PluginConfig', 'plugin/PluginBase', 'plugin/NewPlugin/NewPlugin/meta'], function (PluginConfig, PluginBase, MetaTypes) {
    'use strict';

    /**
    * Initializes a new instance of NewPlugin.
    * @class
    * @augments {PluginBase}
    * @classdesc This class represents the plugin NewPlugin.
    * @constructor
    */
    var NewPlugin = function () {
        // Call base class' constructor.
        PluginBase.call(this);
        this.metaTypes = MetaTypes;
    };

    // Prototypal inheritance from PluginBase.
    NewPlugin.prototype = Object.create(PluginBase.prototype);
    NewPlugin.prototype.constructor = NewPlugin;

    /**
    * Gets the name of the NewPlugin.
    * @returns {string} The name of the plugin.
    * @public
    */
    NewPlugin.prototype.getName = function () {
        return "New Plugin";
    };

    /**
    * Gets the semantic version (semver.org) of the NewPlugin.
    * @returns {string} The version of the plugin.
    * @public
    */
    NewPlugin.prototype.getVersion = function () {
        return "0.1.0";
    };

    /**
    * Main function for the plugin to execute. This will perform the execution.
    * Notes:
    * - Always log with the provided logger.[error,warning,info,debug].
    * - Do NOT put any user interaction logic UI, etc. inside this method.
    * - callback always has to be called even if error happened.
    *
    * @param {function(string, plugin.PluginResult)} callback - the result callback
    */
    NewPlugin.prototype.main = function (callback) {
        // Use self to access core, project, result, logger etc from PluginBase.
        // These are all instantiated at this point.
        var self = this;
        self.updateMETA(self.metaTypes);
        // Using the logger.
        self.logger.info('This is a debug message.');
        self.logger.info('This is an info message.');
        self.logger.warning('This is a warning message.');
        self.logger.error('This is an error message.');

        // This will save the changes. If you don't want to save;
        // exclude self.save and call callback directly from this scope.
        self.result.setSuccess(true);
        self.loadNodes(self.rootNode, function (er, nodes) {
            // console.log({a: nodes});
            self.save('added obj', function (err) {
                callback(null, self.result);
            });
        });

    };

    NewPlugin.prototype.loadNodes = function (start_node, next) {
      var self = this;
      var async = require('async');

      var cached_nodes = {};
      var name = self.core.getAttribute(start_node, 'name');
      load(start_node, name, function (err) {
        if (err) {
          next(err);
        } else {
          next(null, cached_nodes);
        }
      });

      function load(node, path_log, next_next) {
        if (self.debug) console.log('load', path_log);
        self.core.loadChildren(node, function (err, children) {
          if (err) {
            if (self.debug) console.log('Cannot load nodes at', path_log);
            next_next('Cannot load nodes');
          } else {
            if (self.debug) console.log(path_log, 'have', children.length, 'children');
            var error_occured = false;
            async.eachSeries(children, function (child, callback) {
              var curr_path_log = path_log + '/' + self.core.getAttribute(child, 'name');
              cached_nodes[curr_path_log] = child;
              if (self.debug) console.log(curr_path_log);
              load(child, curr_path_log, function (errr) {
                if (errr) {
                  if (self.debug) console.log('Error occured', curr_path_log, errr);
                  if (!error_occured) {
                    error_occured = true;
                    callback(errr);
                  }
                } else {
                  if (self.debug) console.log('Completed', curr_path_log);
                  callback();
                }
              });
            }, function (err) {
              if (self.debug) console.log('Children finished', path_log, 'err', err);
              if (err) {
                if (self.debug) console.log('async err at', path_log, err);
                next_next(err);
              } else {
                next_next();
              }
            });
          }
        });
      }

    };

    return NewPlugin;
});