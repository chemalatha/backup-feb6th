//
//  AccessToken.h
//  encryption_decryption_plugin
//
//  Created by chandan singh on 01/07/15.
//  Copyright (c) 2015 Accenture. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface AccessToken : NSObject

- (void) updateToken:(NSData *) newToken;

@property (nonatomic, readonly) NSData *tokenValueDataEncrypted;

NSString *defaultTokenSavingPath();
@end
