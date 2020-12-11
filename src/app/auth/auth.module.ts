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

const routes: Routes = [
    { path: '', component: AuthComponent, },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'change-password', component: ChangePasswordComponent}
];

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [AdminService],
})
export class AuthModule { }

// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { AdminService } from 'src/@core/Services/admin.service';

// import { AuthRoutingModule } from './auth-routing.module';

// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule,
//     HttpClientModule,
//     AuthRoutingModule,
//   ],
//   providers: [AdminService],
// })
// export class AuthModule { }
