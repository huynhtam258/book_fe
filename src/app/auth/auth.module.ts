import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminService } from 'src/@core/Services/admin.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ChangeInfoComponent } from '../change-info/change-info.component';

const routes: Routes = [
    { path: '', component: AuthComponent, },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'change-password', component: ChangePasswordComponent},
    { path: 'change-info', component: ChangeInfoComponent}
];

@NgModule({
  declarations: [
    AuthComponent, 
    LoginComponent, 
    RegisterComponent, 
    ChangePasswordComponent,
    ChangeInfoComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [AdminService],
})
export class AuthModule { }
