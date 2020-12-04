import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/@core/models/admin';
import { AdminService } from 'src/@core/Services/admin.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  constructor(public router: Router, public adminService: AdminService) { }

  ngOnInit() {
  }
}
