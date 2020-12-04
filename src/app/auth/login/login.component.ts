import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AdminService } from 'src/@core/Services/admin.service';
import { GlobalService } from 'src/@core/Services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router, public adminService: AdminService, private gb: GlobalService) { }

  model = {
    username: '',
    password: ''
  };

  ngOnInit() {
  }
  onLogin(form: NgForm) {
    this.adminService.login(form.value).subscribe(
      (res: any) => {
        this.gb.handler.next(res);
        this.adminService.setToken(res['token']);
        localStorage.setItem('id', res.user.id)
        this.adminService.setUsername(res['user'].username);
        this.adminService.getAdmin(localStorage.getItem('id')).subscribe(
          res => {
            this.gb.handler.next(res);
          }
        )
        if(res.user.role == 'admin'){
          this.router.navigateByUrl('admin');
          return;
        }
        this.router.navigateByUrl('book');
      },
      err => {
        console.log(err.error.massage);
        alert('ID or Password is wrong');
      }
    );
  }
}
