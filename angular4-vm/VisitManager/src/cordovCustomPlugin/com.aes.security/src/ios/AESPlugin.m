//
//  AESPlugin.m
//  encryption_decryption_plugin
//
//  Created by prateek.desai on 30/06/15.
//  Copyright (c) 2015 Accenture. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#import "AESPlugin.h"
#import "RNEncryptor.h"
#import "RNDecryptor.h"
#import "SSKeychain.h"
#import "AccessToken.h"

@interface AESPlugin ()
@property (nonatomic, strong) AccessToken *myToken;
@end

@implementation AESPlugin

// initilizing AccessToken class with document directory saved token or if first time it will load from app bundle. If token is loaded from app bundle it will decrypt with default key and then again encrypt with new key and save to file path.
- (void)pluginInitialize {
    NSLog(@"%@", @"plug in class constructed");
    
    self.myToken = [NSKeyedUnarchiver unarchiveObjectWithFile:defaultTokenSavingPath()];
    if (!self.myToken) {
        NSString *tokenSavedAtBundle = [[NSBundle mainBundle] pathForResource:@"myToken" ofType:@"archive"];
        self.myToken = [NSKeyedUnarchiver unarchiveObjectWithFile:tokenSavedAtBundle];
    }
}

// this method will be used to encrypt the token string, everytime it will create new encryption key to encrypt the token.
- (void) encrypt:(CDVInvokedUrlCommand *)command  {
    NSString *username = [command.arguments objectAtIndex:0];
    NSString *password = [command.arguments objectAtIndex:1];
    
    [self createNewEncryptionKeyAndSaveToKeyChain];
    
    NSDictionary *userCredentials = @{
                                      @"username": username,
                                      @"password": password
                                      };
    
    NSLog(@"%@", userCredentials);
    NSError *error;
    NSData *jsonString = [NSJSONSerialization dataWithJSONObject:userCredentials options:0 error:&error];
    
    NSLog(@"%@", jsonString);
    NSError *encryptError = nil;
    NSString *encryptKey = [SSKeychain passwordForService:@"encryption_decryption_plugin" account:@"encryption_decryption"];
    
    NSData *encryptedData = [RNEncryptor encryptData:jsonString withSettings:kRNCryptorAES256Settings password:encryptKey error:&encryptError];
    
    if (!encryptError){
        [_myToken updateToken:encryptedData]; //updating new encrypted token to AccessToken class object
        if (command.callbackId) {
            CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:nil];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }
    }else {
        NSLog(@"Error obtained while Encryption %@", encryptError.description);
        if (command.callbackId) {
            CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:nil];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }
    }
    
}


- (void) checkIfUserCredentialsExist:(CDVInvokedUrlCommand *)command {
    NSData *tokenData = _myToken.tokenValueDataEncrypted;
    NSString *decryptKey = [SSKeychain passwordForService:@"encryption_decryption_plugin" account:@"encryption_decryption"];
    if(!decryptKey || !tokenData){
        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:false];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }
    else{
        NSError *decryptError;
        NSData *decryptedData = [RNDecryptor decryptData:tokenData withSettings:kRNCryptorAES256Settings password:decryptKey error:&decryptError];
        
        if (decryptedData && decryptedData.length > 0){
            CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:true];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }
        else{
            CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:false];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }
    }
}

- (void) clearEncryptedData:(CDVInvokedUrlCommand *)command{
    NSError *encryptError = nil;
    NSString *encryptKey = [SSKeychain passwordForService:@"encryption_decryption_plugin" account:@"encryption_decryption"]; // fetching new key from keychain store.
    
    NSDictionary *token = @{};
    NSError *error;
    
    NSData *jsonString = [NSJSONSerialization dataWithJSONObject:token options:0 error:&error];
    NSData *encryptedData = [RNEncryptor encryptData:jsonString withSettings:kRNCryptorAES256Settings password:encryptKey error:&encryptError];
    [_myToken updateToken:encryptedData];
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:nil];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

// this method will be used to decrypt token, the key wil be used from keychain latest key.
- (void) decrypt:(CDVInvokedUrlCommand *)command {
    // do decryption
    NSData *tokenData = _myToken.tokenValueDataEncrypted;
    NSString *decryptKey = [SSKeychain passwordForService:@"encryption_decryption_plugin" account:@"encryption_decryption"];
    NSError *decryptError;
    NSData *decryptedData = [RNDecryptor decryptData:tokenData withSettings:kRNCryptorAES256Settings password:decryptKey error:&decryptError];
    
    if (decryptedData && decryptedData.length > 0) {
        NSString* newStr = [[NSString alloc] initWithData:decryptedData encoding:NSUTF8StringEncoding];
        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:newStr];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        NSLog(@"Decrypted string is --  %@",newStr);
    }
    else{
        NSString *errrorReason = decryptError.localizedDescription;
        if (!errrorReason) {
            errrorReason = @"fail to decrypt token";
        }
        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:@{@"failMessage": errrorReason}];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }
    NSLog(@"file decryption error %@",decryptError.description);
}

// this method will be used to create new encryption key and save to keychain store
- (void) createNewEncryptionKeyAndSaveToKeyChain {
    
    // Generate a random number add to the string EncKey and store it in key chain
    int randNum = arc4random();
    NSString *keyToEncrypt = [NSString stringWithFormat:@"EncKey%d", randNum];
    [SSKeychain setPassword:keyToEncrypt forService:@"encryption_decryption_plugin" account:@"encryption_decryption"];
    
}

@end