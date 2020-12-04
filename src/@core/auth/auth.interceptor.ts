// Interceptor dùng để handler các JWT private riêng biệt
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AdminService } from 'src/@core/Services/admin.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private adminService: AdminService, private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (req.headers.get('noauth')) {
            return next.handle(req.clone());
        } else {
            const clonereq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + this.adminService.getToken())
            });
            return next.handle(clonereq).pipe(
                tap(
                    event => { },
                    err => {
                        if (err.error.auth === false) {
                            this.router.navigateByUrl('/auth/login');
                        }
                    }
                )
            );
        }
    }
}
