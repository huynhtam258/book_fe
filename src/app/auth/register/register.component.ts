import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/@core/Services/admin.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  // providers: [ AdminService ]
})
export class RegisterComponent implements OnInit {

  constructor(public adminService: AdminService, private router: Router) { }

  ngOnInit() {
  }
  resetForm(form: NgForm) {
    this.adminService.selectedAdmin = {
      username: '',
      password: ''
    };
    form.resetForm();
  }
  onSubmit(form: NgForm) {
    let data = {
      username: form.value.username,
      password: form.value.password,
      role: 'user',
      firstname: form.value.firstname,
      lastname: form.value.lastname
    }
    this.adminService.regisAdmin(data).subscribe(
      res => {

      this.router.navigate(['auth/login']);
      },
      err => {

      },
    );
  }
}
