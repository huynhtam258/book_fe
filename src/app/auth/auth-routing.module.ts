import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { ChangePasswordComponent } from '../change-password/change-password.component';

const routes: Routes = [
    { path: '', component: AuthComponent, },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
   
];

@NgModule({
    declarations: [AuthComponent, LoginComponent, RegisterComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ]
    // exports: [RouterModule]
})
export class AuthRoutingModule { }
