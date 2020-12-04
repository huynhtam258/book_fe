// lệnh tạo file auth.guard.ts là ng g g auth
// nhớ import vào app.module và nơi cần sử dụng nó để authguard.
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AdminService } from 'src/@core/Services/admin.service';
import { Router } from '@angular/router';
import { GlobalService } from '../Services/global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private adminService: AdminService, private router: Router, private gb: GlobalService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this.adminService.isLoggedIn()) {
        
        this.router.navigateByUrl('/auth/login');
        this.adminService.deleteToken();
        return false;
      }else{
        this.gb.handler.subscribe(
          res =>{
            if(res.role == 'admin'){
              return true;
            }
            this.router.navigateByUrl('/book')
          })
      }
  }
}
