import { Component } from '@angular/core';
import { AdminService } from 'src/@core/Services/admin.service';
import { GlobalService } from 'src/@core/Services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project';
  constructor(private adminService: AdminService, private gb: GlobalService) {
    this.getAdmin();
  }
  getAdmin() {
    this.adminService.getAdmin(localStorage.getItem('id')).subscribe(res => {
      this.gb.handler.next(res);
    }, err => {
      console.log(err);
    });
  }
}
