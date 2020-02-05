import { Injectable } from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';

import { UtilityServices } from '../services/utility.service';

@Injectable()
export class ErrorConfig{

	public APP_ERROR_CODE: any = {
		"Custom": {
			type: 'error',
			title: 'connectionErrorMessage',
			message: ""
		},
		"1": {
		type: 'failure',
		title: "connectionErrorMessage",
		message: "networkErrorMessage"
		},
		"2": {
			type: 'failure',
			title: "loginError",
			message: "loginErrorMessage"
		},
		"3": {
			type: 'error',
			title: "login_invalid_credentials",
			message: "errorMessage"
		},
		"4": {
			type: 'error',
			title: "error_generic_title",
			message: "errorMessage"
		},
		"5": {
			type: 'error',
			title: "error_generic_warning",
			message: "underConstruction"
		},
		"6": {
			type: 'logout',
			title: "logoutTitleErrMsg",
			message: "logoutAlertMessage"
		},
		"7": {
			type: 'success',
			title:"error_generic_success,",
			message: "passwordSent"
		},
		"8": {
			type: 'warning',
			title: "error_generic_success",
			message: ""
		},
		"9": {
			type: 'error',
			title: "sessionExpired",
			message: "sessionExpiredMessage"
		},
		"10": {
			type: 'warning',
			title: "error_generic_noNetwork",
			message: "offlineMode"
		},
		"11": {
			type: 'error',
			title: "error_generic_alert",
			message: ""
		},
		"12": {
			type: 'success',
			title: "error_generic_thanks",
			message: "feedbackSubmitSuccess"
		},
		"13": {
			type: 'failure',
			title: "loginError",
			message: "loginEmptyFieldMessage"
		},
		"14": {
			type: 'error',
			title: "error_generic_title",
			message: "checkInErrorMessage"
		},
		"15": {
			type: 'error',
			title: "error_generic_title",
			message: "passwordDoesNotMatch"
		},
		"16": {
			type: 'error',
			title: "error_generic_title",
			message: "enterPassword"
		},
		"17": {
			type: 'error',
			title: "error_generic_title",
			message: "unableToChangePassword"
		},
		"18": {
			type: 'error',
			title: "error_generic_title",
			message: "selectAllRattingFields"
		},
		"19": {
			type: 'error',
			title: "error_generic_title",
			message: "emptyEmail"
		},
		"20": {
			type: 'error',
			title: "error_generic_title",
			message: "invalidEmail"
		},
		"21": {
			type: 'success',
			title: "error_generic_success",
			message: "passwordChanged"
		},
		"22": {
			type: 'success',
			title: "error_generic_thanks",
			message: "feedbackAlreadySubmitted"
		},
		"23": {
			type: 'success',
			title: "feedbackTitle",
			message: "feedbackNotAvailable"
		},
		"24": {
			type: 'feedback',
			title: "feedbackTitle",
			message: "feedbackRemindMeLater"
		},
		"25": {
			type: 'success',
			title: "feedbackTitle",
			message: "feedbackNotIntrestedSelected"
		},
		"26": {
			type: 'error',
			title: "error_generic_title",
			message: "no_mail_client_configured_message"
		},
		"27": {
			type: 'error',
			title: "error_generic_alert",
			message: "visitIsOver"
		},
		"28": {
			type: 'error',
			title: "underConstruction",
			message: "tabletIsNotSupported"
		},
		"29": {
			type: 'update',
			title: "update_available",
			message: "update_info"
		},
		"30": {
			type: 'changepassword_firsttime_warning',
			title: "change_password_first_time",
			message: "change_password_first_time_text"
		},
		"31": {
			type: 'session_expire',
			title: "sessionGoingTOExpireTitle",
			message: "sessionGoingToExpireMessage"
		},
		"32": {
			type: 'warning',
			title: "carRequestTitle",
			message: "requestCarAlertMesg"
		},
		"33": {
			type: 'error',
			title: "error_generic_title",
			message: "emptyComments"
		},
		"34": {
			type: 'error',
			title: "error_generic_title",
			message: "preferencesErrorMsg"
		},

		"35": {
			type: 'success',
			title: "error_generic_success",
			message: "preferencesSubmitted"
		},

		"36": {
			type: 'success',
			title: "error_generic_success",
			message: "assetDetailsSaved"
		},
		"37": {
			type: 'success',
			title: "error_generic_success",
			message: "assetDetailsDeleted"
		},
		"38": {
			type: 'success',
			title: "error_generic_success",
			message: "downloadMsg"
		},
		"39": {
			type: 'error',
			title: "error_generic_title",
			message: "reLoginMessage"
		},
		"40": {
			type: 'error',
			title: "feedbackTitle",
			message: "pendingFeedbackAlert"
		},
		"41": {
			type: 'failure',
			title: "photoServiceDisable",
			message: "photoServiceDisableMessage"
		},

		"42": {
			type: 'error',
			title: "error_generic_title",
			message: "callNotSupported"
		},
		"43": {
			type: 'error',
			title: "error_generic_title",
			message: "touchIdUnavailable"
		},
		"44": {
			type: 'failure',
			title: "loginError",
			message: "loginEmptyPasswordMessage"
		},
		"45": {
			type: 'error',
			title: "error_generic_title",
			message: "emptyNotes"
		},
			
		"46": {
			type: 'success',
			title: "error_generic_success",
			message: "feedbackSubmitted",
		},
		"47": {
			type: 'success',
			title: "error_generic_success",
			message: "activitySubmitted"
		},
		"48": {
			type: 'success',
			title: "error_generic_success",
			message: "fileDownloaded"
		},
		"49": {
			type: 'warning',
			title: "deleteConfirmation",
			message: "deleteConfirmationtext"
		},
		"50": {
			type: 'success',
			title: "pushNotificationAlert",
			message: "carDetailsAlert"
		},
		"51": {
			type: 'success',
			title: "pushNotificationAlert",
			message: "agendaUpdateAlert"
		},
		"52": {
			type: 'failure',
			title: "error_generic_failure",
			message: "AppError"
		},
		"53": {
			type: 'warningOkCancel',
			title: "emailConfirmationHeader",
			message: "emailConfirmationText"
		},
		"100": {
			type: 'failure',
			title: "error_generic_failure",
			message: "errorMessage"
		},
		"101": {
			type: 'error',
			title: "error_generic_title",
			message: "errorMessage"
		},
		"102": {
			type: 'failure',
			title: "loginError",
			message: "loginErrorMessage"
		},
		"103": {
			type: 'failure',
			title: "error_generic_failure",
			message: "error_code_no_meeting_exists"
		},
		"104": {
			type: 'failure',
			title: "error_generic_failure",
			message: "error_code_un_authorized_user"
		},
		"105": {
			type: 'failure',
			title: "error_generic_title",
			message: "error_code_invalid_user_id"
		},
		"106": {
			type: 'failure',
			title: "error_generic_failure",
			message: "error_code_invalid_input_data"
		},
		"107": {
			type: 'failure',
			title: "error_generic_failure",
			message: "error_code_password_can_not_be_null"
		},
		"108": {
			type: 'failure',
			title: "error_generic_title",
			message: "error_code_incorrect_password"
		},
		"109": {
			type: 'failure',
			title: "sessionExpired",
			message: "sessionExpiredMessage"
		},
		"110": {
			type: 'error',
			title: "error_generic_title",
			message: "errorMessage"
		},
		"111": {
			type: 'error',
			title: "error_generic_title",
			message: "error_code_new_and_old_passwords_same"
		},
		"112": {
			type: 'error',
			title: "error_generic_title",
			message: "error_code_feedback_already_submitted"
		},
		"113": {
			type: 'error',
			title: "error_generic_title",
			message: "error_code_no_confirmation_no_found"
		},
		"114": {
			type: 'error',
			title: "error_generic_title",
			message: "error_code_unable_to_save_data"
		},
		"115": {
			type: 'error',
			title: "error_generic_title",
			message: "errorMessage"
		},
		"116": {
			type: 'error',
			title: "error_generic_title",
			message: "error_code_expired_creds"
		},
		"118": {
			type: 'error',
			title: "error_generic_title",
			message: "error_code_new_and_previous_passwords_same"
		},
		"120": {
			type: 'error',
			title: "error_generic_title",
			message: "no_action_item"
		},
		"INVALID_CODE": {
			type:'failure',
			title: "",
			message: "connectionerrormessage_offline"
		},
		"140": {
			type: 'error',
			title: "connectionErrorMessage",
			message: "networkErrorMessage"
		},
    "141": {
      type: 'success',
      title: "error_generic_success",
      message: "saveContactSuccess"
    },
    "142": {
      type: 'error',
      title: "error_generic_title",
      message: "saveContactFailure"
    }
	};

  constructor( private _translate: TranslateService, private utilityService: UtilityServices) {
  }

	getCode(id) {
        if (this.APP_ERROR_CODE[id]) {
            return this.APP_ERROR_CODE[id].code ? this.APP_ERROR_CODE[id].code : id;
        } else {
            return 'INVALID_CODE';
        }
    }

    getTitle(id) {
        var code = this.getCode(id);
        return this._translate.instant(this.APP_ERROR_CODE[code].title);
    }

    getMessage(id) {
        var code = this.getCode(id);
        return this._translate.instant(this.APP_ERROR_CODE[code].message);
    }

    getType(id){
    	 var code = this.getCode(id);
        return this.APP_ERROR_CODE[code].type;
    }
    showMessage(id) {
    	console.log("show ", id);
        var title = this.getTitle(id);
        var message = this.getMessage(id);
        if (message === "" || message === undefined) {
            message = this._translate.instant("connectionerrormessage_offline");
        }
        let type = this.getType(id);
        this.utilityService.alertMsg(title, message, type);
    }
}