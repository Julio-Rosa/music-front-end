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

  

  success: boolean = false;
  successMessage: string = 'Sucesso!';
  alreadExists = false;

  error: boolean = false;
  errorMessage: string = 'Ocorreu um erro!'
  
 




  constructor(private userService: UserService, private router: Router) {
    
  }

  ngOnInit(): void {

  }


  handleFormSubmit(formData:any){
    this.new(formData);

  }





  new(body: any) {
    this.userService.new(body).subscribe(response => {
      
      this.success = true;
      this.successMessage = 'Usúario criado com sucesso!';

      setTimeout(() => {
        this.router.navigate(['/admin/users'])
      }, 2000)
    }, (error) => {
  
    })
  }












}
