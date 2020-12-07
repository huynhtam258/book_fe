import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
// import { AuthModule } from './auth/auth.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
// import { ToastrModule } from 'ngx-toastr';

// Auth guard
import { AuthGuard } from 'src/@core/auth/auth.guard';
import { AuthInterceptor } from 'src/@core/auth/auth.interceptor';
import { LogoComponent } from './shared-component/logo/logo.component';
import { AngularFireModule } from '@angular/fire/firebase.app.module';
import { AngularFirestore } from '@angular/fire/firestore/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { environment } from 'src/environments/environment';
@NgModule({
  declarations: [LogoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    // AngularFireDatabaseModule
    // ToastrModule.forRoot({
    //   timeOut: 2000,
    //   positionClass: 'toast-top-right',
    //   preventDuplicates: false
    // }),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
