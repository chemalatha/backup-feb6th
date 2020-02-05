package com.aes.security;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.security.AlgorithmParameters;
import java.security.SecureRandom;
import java.security.spec.KeySpec;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.cordova.CallbackContext;

import android.app.Application;
import android.content.Context;
import android.content.SharedPreferences;

public class AESClearEncryptedData {
	
	 public static boolean clearEncryptedData(Context context,SharedPreferences sharedPref) throws Exception{

		FileOutputStream outFile = context.openFileOutput("encryptedfile.des",context.MODE_PRIVATE);
		FileOutputStream saltOutFile = context.openFileOutput("salt.enc",context.MODE_PRIVATE);
		FileOutputStream ivOutFile = context.openFileOutput("iv.enc",context.MODE_PRIVATE);

		String password = new SecureRandom().getSeed(20)+"%%*ttls&&hiwwya*%%";

		// password, iv and salt should be transferred to the other end
		// in a secure manner

		// salt is used for encoding
		// writing it to a file
		// salt should be transferred to the recipient securely
		// for decryption
		
		byte[] salt = new byte[8];
		SecureRandom secureRandom = new SecureRandom();
		secureRandom.nextBytes(salt);

		
		saltOutFile.write(salt);
		saltOutFile.close();

		SecretKeyFactory factory = SecretKeyFactory
				.getInstance("PBKDF2WithHmacSHA1");
		KeySpec keySpec = new PBEKeySpec(password.toCharArray(), salt, 65536,
				256);
		SecretKey secretKey = factory.generateSecret(keySpec);
		SecretKey secret = new SecretKeySpec(secretKey.getEncoded(), "AES");

		
		Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
		cipher.init(Cipher.ENCRYPT_MODE, secret);
		AlgorithmParameters params = cipher.getParameters();

		// iv adds randomness to the text and just makes the mechanism more
		// secure
		// used while initializing the cipher
		// file to store the iv
		
		byte[] iv = params.getParameterSpec(IvParameterSpec.class).getIV();
		ivOutFile.write(iv);
		ivOutFile.close();

		//file encryption
		byte[] input = new byte[64];
		//int bytesRead;

        String str="";
        input = str.getBytes();
        byte[] output = cipher.update(input);
        if(output !=null){
        	outFile.write(output);
        }


		byte[] output1 = cipher.doFinal();
		if (output1 != null)
			outFile.write(output1);

		//inFile.close();
		outFile.flush();
		outFile.close();

		//System.out.println("File Encrypted.");
		/**
		 * Putting new Password in sharedPreferences
		 * 
		 */
		SharedPreferences.Editor spEditor = sharedPref.edit();
		spEditor.putString("com.aes.securtiy.key", password);
		spEditor.commit();
		return true;
		
	}

}