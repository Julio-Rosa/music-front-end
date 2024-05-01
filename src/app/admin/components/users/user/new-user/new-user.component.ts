import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  newForm: FormGroup;
  subbmited: boolean = false;

  success: boolean = false;
  successMessage: string = 'Sucesso!';
  alreadExists = false;

  error: boolean = false;
  errorMessage: string = 'Ocorreu um erro!'
  passwordToSend: string;





  constructor(private formBuilder: FormBuilder) {
    this.newForm = formBuilder.group({
      email: ['', Validators.email],
      name: ['', Validators.required],
      password: ['',],
      password2: ['',]

    })
  }

  ngOnInit(): void {

  }

  verifyIfPassworsAreEqual(password: any, passwordRepeat: any) {

    if (password === passwordRepeat) {

      return password;
    } else {

      this.newForm.get('password2').setErrors({ notEqual: true });
    }

  }

  validPassword(password: any) {
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasSpecialChar = /[^a-zA-Z0-9\s]/;
    const hasNumber = /\d/;

    if (password.length < 8) {
      this.newForm.get('password').setErrors({ lengthMin: true });
    }
    if (!hasUpperCase.test(password)) {
      this.newForm.get('password').setErrors({ containsUpper: true });
    }
    if (!hasLowerCase.test(password)) {
      this.newForm.get('password').setErrors({ containsLower: true });
    }
    if (!hasSpecialChar.test(password)) {
      this.newForm.get('password').setErrors({ containsSpecialChar: true });
    }
    if (!hasNumber.test(password)) {
      this.newForm.get('password').setErrors({ containsNumber: true });
    }




  }

  onSubmit() {

    this.subbmited = true;
    this.validPassword(this.newForm.get('password').value);
    this.verifyIfPassworsAreEqual(this.newForm.get('password').value, this.newForm.get('password2').value);


    if (this.newForm.invalid) {
      return;
    }
    const body = {
      name: this.newForm.get('name').value,
      email: this.newForm.get('email').value,
      passwordToSend: this.newForm.get('password').value,

    }

  }



}
