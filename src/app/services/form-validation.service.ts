// src/app/services/form-validation.service.ts
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor() { }

  customEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const valid = emailPattern.test(control.value);
      return valid ? null : { invalidEmail: true };
    };
  }

  customNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const namePattern = /^[a-zA-Z\s]+$/;
      const valid = namePattern.test(control.value);
      return valid ? null : { invalidEmail: true };
    };
  }

  updateNumberDocumentValidators(numberDocumentControl: AbstractControl | null, selectedType: string) {
    if (!numberDocumentControl) return;

    numberDocumentControl.clearValidators();

    if (selectedType === 'PA') {
      numberDocumentControl.setValidators([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15)
      ]);
    } else {
      numberDocumentControl.setValidators([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
        Validators.pattern(/^[0-9]+$/)
      ]);

      numberDocumentControl.setErrors({ invalidDocument: 'El número de documento debe contener solo números.' });
    }

    numberDocumentControl.updateValueAndValidity();
  }
}
