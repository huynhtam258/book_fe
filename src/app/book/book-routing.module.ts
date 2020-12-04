import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookHomeComponent } from './book-home/book-home.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookComponent } from './book.component';
import { BookByAuthorComponent } from './book-by-author/book-by-author.component';
import { BookByCategoryComponent } from './book-by-category/book-by-category.component';
import { AuthorHomeComponent } from './author-home/author-home.component';
import { AuthorDetailComponent } from './author-detail/author-detail.component';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
    { path: '', component: BookComponent, children: [
            { path: '', component: BookHomeComponent },
            { path: 'detail/:id', component: BookDetailComponent },
            { path: 'bookByAuthor', component: BookByAuthorComponent},
            { path: 'bookByCategory', component: BookByCategoryComponent},
            { path: 'authors', component: AuthorHomeComponent },
            { path: 'detailAuthor/:id', component: AuthorDetailComponent },
            { path: 'aboutUs', component: AboutUsComponent },
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
export class BookRoutingModule { }
