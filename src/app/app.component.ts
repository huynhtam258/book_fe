import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/@core/Services/admin.service';
import { GlobalService } from 'src/@core/Services/global.service';
import { UploadService } from 'src/@core/Services/upload-file.service';

// import { AngularFireStorage } from "@angular/fire/storage";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project';
  constructor(
    private adminService: AdminService,
    private gb: GlobalService,
    private router: Router,
    private uploadService: UploadService) {
    this.getAdmin();
  }
  getAdmin() {
    this.adminService.getAdmin(localStorage.getItem('id')).subscribe((res: any) => {
      if (res.role == 'admin') {
        this.router.navigate(['admin'])
      }
      this.gb.handler.next(res);
      console.log(res);
      
    }, err => {
      console.log(err);
    });
  }
  
}
