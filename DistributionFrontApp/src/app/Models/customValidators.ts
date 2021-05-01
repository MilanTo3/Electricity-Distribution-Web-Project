import { ValidatorFn, AbstractControl, Validators, FormControl } from '@angular/forms';

export class customFormValidators {
    static dateLessThan(dateField1: string, dateField2: string, validatorField: { [key: string]: boolean }): ValidatorFn {
        return (form: AbstractControl): { [key: string]: boolean } | null => {
            const date1 = form.get(dateField1).value;
            const date2 = form.get(dateField2).value;
            if ((date1 !== null && date2 !== null) && date1 > date2) {
                return validatorField;
            }
            return null;
        };
    }
    
    static passwordConfirmCheck(passwordField1: string, passwordField2: string, validatorField: { [key: string]: boolean }): ValidatorFn {

        return (form: AbstractControl): { [key: string]: boolean } | null => {
            
            const pass1 = form.get(passwordField1).value;
            const pass2 = form.get(passwordField2).value;
            if((pass1 !== null && pass2 !== null) && pass1 !== pass2){
                return validatorField;
            }
            return null;
        };
    }
}