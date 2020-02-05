package com.aes.security;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaInterface;
import android.util.Log;
import android.content.Context;
import android.content.SharedPreferences;
import android.provider.Settings;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;



public class AESPlugin extends CordovaPlugin{

	public AESPlugin() {
		// TODO Auto-generated constructor stub
	}
	
	public void initialize(CordovaInterface cordova, CordovaWebView webView){
		super.initialize(cordova, webView);	
	}
	
	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException{

		Context appContext = this.cordova.getActivity().getApplicationContext();
		SharedPreferences sharedPref= this.cordova.getActivity().getPreferences(appContext.MODE_PRIVATE);
		
		if(action.equals("encrypt")){
			String username = args.getString(0);
			String password = args.getString(1);
			this.encrypt(username,password,callbackContext,appContext,sharedPref);
			return true;
		}
		if(action.equals("decrypt")){
			this.decrypt(callbackContext,appContext,sharedPref);
			return true;
		}
		if(action.equals("checkIfUserCredentialsExist")){
			this.checkIfUserCredentialsExist(callbackContext,appContext,sharedPref);
			return true;
		}
		if(action.equals("clearEncryptedData")){			
			this.clearEncryptedData(callbackContext,appContext,sharedPref);
			return true;
		}
		return false;
	}
	private void encrypt(String username,String password,CallbackContext callbackContext,Context appContext,SharedPreferences sharedPref){	
		try{
			String userCredentials = "{\"username\":\""+username+"\",\"password\":\""+password+"\"}";
			if(AESFileEncryption.encrypt(userCredentials,appContext,sharedPref)){
			   callbackContext.success("success");
			}
		}catch(Exception e){
			e.printStackTrace();
		    callbackContext.error("failure");
		    e.printStackTrace();
		}
	}
	private void decrypt(CallbackContext callbackContext,Context appContext,SharedPreferences sharedPref){	
			try{
				String code= AESFileDecryption.decrypt(appContext,sharedPref);
			   	callbackContext.success(code);
			}catch(Exception e){
		   		 callbackContext.error("failure");
			}
	}
	private void checkIfUserCredentialsExist(CallbackContext callbackContext,Context appContext,SharedPreferences sharedPref){	
			try{
			String code= AESCheckUserCredentialsExist.checkIfUserCredentialsExist(appContext,sharedPref);
			   callbackContext.success(code);
			
		}catch(Exception e){
		    callbackContext.error("failure");
		}
	}
	private void clearEncryptedData(CallbackContext callbackContext,Context appContext,SharedPreferences sharedPref){	
		try{
			if(AESClearEncryptedData.clearEncryptedData(appContext,sharedPref)){
			   callbackContext.success("success");
			}
		}catch(Exception e){
			e.printStackTrace();
		    callbackContext.error("failure");
		    e.printStackTrace();
		}
	}

}
