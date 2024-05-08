import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/admin/services/user/user.service';

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
  isError = true;

 




  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
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

  new(body: any) {
    this.userService.new(body).subscribe(response => {
      
      this.success = true;
      this.successMessage = 'Usúario criado com sucesso!';

      setTimeout(() => {
        this.router.navigate(['/admin/users'])
      }, 2000)
    }, (error) => {
      if (error.status === 400) {
        if (error['error']['message'] === 'User already exists!') {
          this.newForm.get('email').setErrors({ userAlreadyExists: true });
        }
      }else{
        this.error = true;
        this.errorMessage = 'Ocorreu um erro ao criar um novo usúario!'
        setTimeout(() => {
          this.error = false;
        }, 3000)
      }
    })
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

    this.subbmited = true;





    if (this.newForm.invalid) {

      
      return;
    }


    const body = {
      name: this.newForm.get('name').value,
      email: this.newForm.get('email').value,
      role_name: this.newForm.get('role').value,
      password: this.newForm.get('password').value,

    }

    this.new(body);

  }



}
