package com.aes.security;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.security.spec.KeySpec;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;

import android.R;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.res.AssetManager;

public class AESFileDecryption {
	public static String decrypt(Context context,SharedPreferences sharedPref) throws Exception {
		String defaultKey = "CVM_2016";
		String password =  sharedPref.getString("com.aes.securtiy.key", defaultKey);
        AssetManager assetManager = context.getAssets();
        
        
		/**
		 * If the secretkey is present in sharedPreferences then pick the files from Local Context
		 * else if there is no secret key that has been set so far then it is first time so pick from asset folder all encrypted files.
		 */
        boolean firstTime = false;
	    InputStream saltFis;
	    InputStream ivFis;
	    InputStream fis;
	    if(password == "CVM_2016"){
	    	//First Time
	    	firstTime = true;
	    	saltFis = assetManager.open("salt.enc",context.MODE_PRIVATE);
	    	ivFis = assetManager.open("iv.enc", context.MODE_PRIVATE);
	    	fis= assetManager.open("encryptedfile.des", context.MODE_PRIVATE);	
	    }else{
	    	saltFis = context.openFileInput("salt.enc");
	    	ivFis = context.openFileInput("iv.enc");
	    	fis = context.openFileInput("encryptedfile.des");
	    }
	    
	    
	    
		byte[] salt = new byte[8];
		saltFis.read(salt);
		saltFis.close();

		// reading the iv
		
		byte[] iv = new byte[16];
		ivFis.read(iv);
		ivFis.close();


		SecretKeyFactory factory = SecretKeyFactory
				.getInstance("PBKDF2WithHmacSHA1");
		KeySpec keySpec = new PBEKeySpec(password.toCharArray(), salt, 65536,
				256);
		SecretKey tmp = factory.generateSecret(keySpec);
		SecretKey secret = new SecretKeySpec(tmp.getEncoded(), "AES");

		// file decryption
		Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
		cipher.init(Cipher.DECRYPT_MODE, secret, new IvParameterSpec(iv));
		
		byte[] in = new byte[256];
		byte[] output = new byte[256];
		int read;
		int counter = 0;
		while ((read = fis.read(in)) != -1) {
			counter++;
			// System.out.println("Sudershan=====File Decrypt " + counter + " read " + read);
			output = cipher.update(in, 0, read);
		}
       
	    byte[] output1 = cipher.doFinal();
	
		fis.close();

		String message1 = new String(output);
		String message2 = new String(output1);
		String message = message1 + message2;

		if(firstTime){
			AESFileEncryption aesEncryption = new AESFileEncryption();
			aesEncryption.encrypt(message, context, sharedPref);
		}
		//System.out.println("File Decrypted.");
		return message;
	}
}