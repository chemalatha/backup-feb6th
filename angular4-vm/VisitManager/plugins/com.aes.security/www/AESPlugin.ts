  declare var cordova: any;
  export class AESPlugin{
    
    /*private argscheck = require('cordova/argscheck');
    private utils = require('cordova/utils');
    private exec = require('cordova/exec');*/

     constructor(){}

    static saveUserCredentials(username, password, success, failure) {
        if (!success)
            success = null;
        if (!failure)
            failure = null;
        cordova.exec(success, failure, "AESPlugin", "encrypt", [username, password]);
    }

    static retrieveUserCredentials(success, failure) {
        if (!success)
            success = null;
        if (!failure)
            failure = null;
        cordova.exec(success, failure, "AESPlugin", "decrypt", []);
    }

    static checkIfUserCredentialsExist(success, failure) {
        if (!success)
            success = null;
        if (!failure)
            failure = null;
        cordova.exec(success, failure, "AESPlugin", "checkIfUserCredentialsExist", []);
    }

    static clearUserCredentials(success, failure) {
        if (!success)
            success = null;
        if (!failure)
            failure = null;
        cordova.exec(success, failure, "AESPlugin", "clearEncryptedData", []);
    }
}


