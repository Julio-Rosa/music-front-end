import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { LoginComponent } from './auth/components/login/login.component';

const routes: Routes = [
  {path: 'auth/login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AdminRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
