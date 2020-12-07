import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { BookComponent } from './book/book.component';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FirstpageComponent } from './firstpage/firstpage.component';

import { AuthGuard } from 'src/@core/auth/auth.guard';
// , canActivate: [AuthGuard] 
const routes: Routes = [
  {
    path: '', component: AppComponent, children: [
      { path: '', component: FirstpageComponent },
      { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
      { path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
      { path: 'book', loadChildren: './book/book.module#BookModule' }
    ]
  },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  declarations: [
      AppComponent,
      NotfoundComponent,
      FirstpageComponent
    ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
  // exports: [RouterModule]
})
export class AppRoutingModule { }
