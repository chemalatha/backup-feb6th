//
//  AESPlugin.h
//  encryption_decryption_plugin
//
//  Created by prateek.desai on 30/06/15.
//  Copyright (c) 2015 Accenture. All rights reserved.
//

// #import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>

@interface AESPlugin : CDVPlugin

// method will be used to encrypt the token
- (void) encrypt:(CDVInvokedUrlCommand *)command;

//method will be used to decrypt the token
- (void) decrypt:(CDVInvokedUrlCommand *)command;

- (void) clearEncryptedData:(CDVInvokedUrlCommand *)command;

- (void) checkIfUserCredentialsExist:(CDVInvokedUrlCommand *)command;

@end

