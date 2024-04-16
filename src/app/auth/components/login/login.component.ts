import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string = '';
  password:string = '';
 error:boolean = true;
 errorMessage = 'Ocorreu um erro ao fzer o login!';

 

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.login(this.email, this.password).subscribe(response => {
        this.setToken(response.token);
        setTimeout(() => {  
          this.route.navigate(['/admin']);

        },5000);
       
    },
    error => {
        console.error(error);
    })
  }



  setToken(token:string){
    localStorage.setItem('token', token);
  }
}
