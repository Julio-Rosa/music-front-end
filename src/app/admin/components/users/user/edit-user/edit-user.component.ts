import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/admin/models/user';
import { UserService } from 'src/app/admin/services/user/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

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
  
  userId:string;

  user: User;
  userRole: string;
  secondRole: string;
  
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) {

    this.updatePasswordForm = formBuilder.group ({
      password: ['', [Validators.required, this.validPassword()]],
      confirmPassword: ['',]
    },{validator: this.passwordMatchValidator})
    this.editForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      defaultRole: ['',],
      secondRole: ['']
    
      

     } )
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

  edit(id:string, body: any) {
    this.userService.updateUserById(id,body).subscribe(response => {
      
      this.success = true;
      this.successMessage = 'Dados do usuario salvo com sucesso!';

      setTimeout(() => {
          this.success = false;
          window.location.reload();
      }, 2000)
    }, (error) => {
      if (error.status === 400) {
        if (error['error']['message'] === 'User already exists!') {
          this.editForm.get('email').setErrors({ userAlreadyExists: true });
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

  updatePassword(id:string,body:any){
    this.userService.resetUserPassword(id, body).subscribe(response => {
        this.success = true;
         this.successMessage = 'Senha atualizada com sucesso!';

         setTimeout(() => {
          this.success = false;
          window.location.reload();
         }, 3000)
    },(error) => {
      this.error = true;
         this.errorMessage = 'Ocorreu um erro ao atualizar a senha!';

         setTimeout(() => {
          this.error = false;
         }, 3000)

    })
  }

  getById(){
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['id'];

      this.userService.getById(this.userId).subscribe(result => {
         this.user = result;
         if(this.user.role === 'USER'){
          this.secondRole = 'EDITOR';
        }
        if(this.userRole === 'EDITOR'){
          this.secondRole = 'USER'    
        }

        
         
         
      })
    })
  }

  get name() {

    return this.editForm.get('name');
  }
  get email() {
    return this.editForm.get('email');
  }
  get defaultRole() {
    return this.editForm.get('defaulRole');
  }
  get secondRoleValue(){
    return this.editForm.get('secondRole');
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
        role_name: this.editForm.get('role').value,
  
      }
      this.edit(this.userId, body);

    }




    resetUserPassword(){
      this.updatePasswordSubbmited = true;

      if(this.updatePasswordForm.invalid){
        return;
      }
      const body = {
        newPassword: this.password.value,
        newPasswordRepeat: this.confirmPassword.value
      }

      this.updatePassword(this.userId, body);

    }








  }


