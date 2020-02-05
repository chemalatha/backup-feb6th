"use strict";
var AESPlugin = (function () {
    /*private argscheck = require('cordova/argscheck');
    private utils = require('cordova/utils');
    private exec = require('cordova/exec');*/
    function AESPlugin() {
    }
    AESPlugin.saveUserCredentials = function (username, password, success, failure) {
        if (!success)
            success = null;
        if (!failure)
            failure = null;
        cordova.exec(success, failure, "AESPlugin", "encrypt", [username, password]);
    };
    AESPlugin.retrieveUserCredentials = function (success, failure) {
        if (!success)
            success = null;
        if (!failure)
            failure = null;
        cordova.exec(success, failure, "AESPlugin", "decrypt", []);
    };
    AESPlugin.checkIfUserCredentialsExist = function (success, failure) {
        if (!success)
            success = null;
        if (!failure)
            failure = null;
        cordova.exec(success, failure, "AESPlugin", "checkIfUserCredentialsExist", []);
    };
    AESPlugin.clearUserCredentials = function (success, failure) {
        if (!success)
            success = null;
        if (!failure)
            failure = null;
        cordova.exec(success, failure, "AESPlugin", "clearEncryptedData", []);
    };
    return AESPlugin;
}());
exports.AESPlugin = AESPlugin;
