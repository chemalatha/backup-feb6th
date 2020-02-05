//
//  AccessToken.m
//  encryption_decryption_plugin
//
//  Created by chandan singh on 01/07/15.
//  Copyright (c) 2015 Accenture. All rights reserved.
//

#import "AccessToken.h"

static NSString *const kAccessTokenValue = @"myAccessTokenValue";

@implementation AccessToken

- (id)initWithCoder:(NSCoder *)decoder {
    if ((self=[super init])) {
        _tokenValueDataEncrypted = [decoder decodeObjectForKey:kAccessTokenValue];
    }
    return self;
}

- (void)encodeWithCoder:(NSCoder *)encoder {
    [encoder encodeObject:_tokenValueDataEncrypted forKey:kAccessTokenValue];
}

- (void) updateToken:(NSData *) newToken {
    _tokenValueDataEncrypted = newToken;
    
    [NSKeyedArchiver archiveRootObject:self toFile:defaultTokenSavingPath()];
    NSLog(@"Token is generated and saved to :%@",defaultTokenSavingPath());
}

- (void) dealloc {
    _tokenValueDataEncrypted = nil;
}


NSString *defaultTokenSavingPath() {
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *documentsDirectory =  [paths objectAtIndex:0];
    NSString *tokenSavingPath = [documentsDirectory stringByAppendingPathComponent:@"myToken.archive"];
    return tokenSavingPath;
}

@end
