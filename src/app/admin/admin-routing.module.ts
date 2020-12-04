import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookManagerComponent } from './book-manager/book-manager.component';
import { AuthorManagerComponent } from './author-manager/author-manager.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
    { path: '', component: AdminComponent, children: [
            { path: '', component: BookManagerComponent },
            { path: 'author_manager', component: AuthorManagerComponent },
    ]},
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ]
    // exports: [RouterModule]
})
export class AdminRoutingModule { }
