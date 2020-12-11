import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/@core/Services/admin.service';
import { GlobalService } from 'src/@core/Services/global.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(public router: Router, public adminService: AdminService, private gb: GlobalService) { }

  model = {
    username: '',
    password: '',
    new_password: ''
  };

  ngOnInit() {
    localStorage.clear();
  }
  onLogin(form: NgForm) {
    this.adminService.changePassword(form.value).subscribe(
      (res: any) => {
        alert(res.message)
        //   this.gb.handler.next(res);
        //   this.adminService.setToken(res['token']);
        //   localStorage.setItem('id', res.user.id);
        //   if(res.body.role == 'admin'){
        //     this.router.navigateByUrl('admin');
        //   }else{
        //     this.router.navigateByUrl('book');
        //   }
        //   this.adminService.setUsername(res['user'].username);
        //   this.adminService.getAdmin(res.user.id).subscribe(
        //     res => {
        //     this.gb.handler.next(res);
        //   }
        // )
        
      },
      err => {
        console.log(err.error.massage);
        alert('ID or Password is wrong');
      }
    );
  }
}
