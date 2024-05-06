import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/admin/models/user';
import { UserService } from 'src/app/admin/services/user/user.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {


  editForm: FormGroup;
  updatePasswordForm: FormGroup;
  editSubbmited: boolean = false;
  updatePasswordSubbmited: boolean = false;

  success: boolean = false;
  successMessage: string = 'Sucesso!';
  alreadExists = false;

  error: boolean = false;
  errorMessage: string = 'Ocorreu um erro!'
  passwordToSend: string;
  isError = true;

  userId: string;

  user: User;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) {

    this.updatePasswordForm = formBuilder.group({
      userPassword: ['', [Validators.required]],
      password: ['', [Validators.required, this.validPassword()]],
      confirmPassword: ['',]
    }, { validator: this.passwordMatchValidator })
    this.editForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],


    })
  }

  ngOnInit(): void {
    this.me();
  }



  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password').value;
    const confirmPassword = form.get('confirmPassword').value;

    if (confirmPassword.length <= 0) {
      return form.get('confirmPassword').setErrors({ empty: true });
    } else {

      if (password !== confirmPassword) {


        console.log(password !== confirmPassword);

        return form.get('confirmPassword').setErrors({ mismatch: true });
      } else {





        return form.get('confirmPassword').setErrors(null);
      }
    }



  }








 me(){
  this.userService.me().subscribe(response => {
      this.user = response;
  })
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

  edit(id: string, body: any) {
    this.userService.updateUser(id, body).subscribe(response => {

      this.success = true;
      this.successMessage = 'Dados atualizados com sucesso!';

      setTimeout(() => {
        this.success = false;
        window.location.reload();
      }, 2000)
    }, (error) => {
      if (error.status === 400) {
        if (error['error']['message'] === 'User already exists!') {
          this.editForm.get('email').setErrors({ userAlreadyExists: true });
        }
      } else {
        this.error = true;
        this.errorMessage = 'Ocorreu um erro ao atualizar os dados!!'
        setTimeout(() => {
          this.error = false;
        }, 3000)
      }
    })
  }

  updateMePassword(body: any) {
    this.userService.updatePassword(body).subscribe(response => {
      this.success = true;
      this.successMessage = 'Senha atualizada com sucesso!';

      setTimeout(() => {
        this.success = false;
        window.location.reload();
      }, 3000)
    }, (error) => {
      this.error = true;
      this.errorMessage = 'Ocorreu um erro ao atualizar a senha!';

      setTimeout(() => {
        this.error = false;
      }, 3000)

    })
  }



  get name() {

    return this.editForm.get('name');
  }
  get email() {
    return this.editForm.get('email');
  }

  get userPassword() {
    return this.updatePasswordForm.get('userPassword');
  }
  get password() {

    return this.updatePasswordForm.get('password');
  }
  get confirmPassword() {

    return this.updatePasswordForm.get('confirmPassword');
  }



  updateUser() {
    this.editSubbmited = true;

    if (this.editForm.invalid) {


      return;
    }

    const body = {
      name: this.editForm.get('name').value,
      email: this.editForm.get('email').value,

    }
    this.edit(this.user.user_id, body);

  }

  updatePassword() {
    this.updatePasswordSubbmited = true;

    if (this.updatePasswordForm.invalid) {
      return;
    }
    const body = {
      password: this.userPassword.value,
      newPassword: this.password.value,
      newPasswordRepeat: this.confirmPassword.value
    }

    this.updateMePassword(body);

  }


}
