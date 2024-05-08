import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-user-form',
  templateUrl: './new-user-form.component.html',
  styleUrls: ['./new-user-form.component.css']
})
export class NewUserFormComponent implements OnInit {

  newForm: FormGroup;
  subbmited: boolean = false;
  passwordToSend: string;
  isError = true;
  
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();

  


 

  constructor(private formBuilder: FormBuilder) { 
    this.newForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', [Validators.required, this.validPassword()]],
      confirmPassword: ['',]

    }, { validator: this.passwordMatchValidator })
  }

  ngOnInit(): void {
  }


  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password').value;
    const confirmPassword = form.get('confirmPassword').value;

    if (confirmPassword.length <= 0) {
      return form.get('confirmPassword').setErrors({ empty: true });
    } else {

      if (password !== confirmPassword) {


        console.log(password !==confirmPassword);

        return form.get('confirmPassword').setErrors({ mismatch: true });
      } else {





        return form.get('confirmPassword').setErrors(null);
      }
    }



  }

  validPassword(): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } | null => {
      const value: string = control.value;

      const containsSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
      const containsNumber = /\d+/.test(value);
      const containsLower = /[a-z]+/.test(value);
      const containsUpper = /[A-Z]+/.test(value);
      const minLength = (value.length >= 8)



      if (containsSpecialChar && containsNumber && containsLower && containsUpper && minLength) {
        return null;
      }


      return {
        'passwordRequirements': {
          'specialChar': !containsSpecialChar,
          'number': !containsNumber,
          'lower': !containsLower,
          'upper': !containsUpper,
          'length': !minLength
        }
      }
    }








  }
 


  get name() {

    return this.newForm.get('name');
  }
  get email() {
    return this.newForm.get('email');
  }

  get password() {

    return this.newForm.get('password');
  }
  get confirmPassword() {

    return this.newForm.get('confirmPassword');
  }
  get role() {

    return this.newForm.get('role');
  }

  onSubmit() {
    if (this.newForm.valid) {
      this.formSubmit.emit(this.newForm.value);
    } else {
      console.error('Form is invalid');
    }
  }

}
