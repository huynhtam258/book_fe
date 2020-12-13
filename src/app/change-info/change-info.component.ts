import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from 'src/@core/Services/admin.service';

@Component({
  selector: 'app-change-info',
  templateUrl: './change-info.component.html',
  styleUrls: ['./change-info.component.scss']
})
export class ChangeInfoComponent implements OnInit {

  model = {
    username: '',
    password: '',
    new_password: ''
  };
  constructor(private adminService: AdminService) { }

  ngOnInit() {
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
