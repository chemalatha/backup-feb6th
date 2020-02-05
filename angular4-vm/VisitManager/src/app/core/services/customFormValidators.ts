import {AbstractControl} from '@angular/forms';

export class CustomFormValidators{

    public static passwordMatcher(c: AbstractControl): {[key: string]: boolean} | null {
        let newPasswordControl = c.get('newPassword');
        let confirmPasswordControl = c.get('confirmPassword');
        let currentPasswordControl = c.get('currentPassword');

        if (newPasswordControl.value && currentPasswordControl.value && newPasswordControl.value === currentPasswordControl.value) {
            return { 'samematch': true };

        }else if (newPasswordControl.value && confirmPasswordControl.value && newPasswordControl.value !== confirmPasswordControl.value) {
            return { 'match': true };
        }else {
            return null;
        }
    };
}
