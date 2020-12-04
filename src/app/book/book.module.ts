import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book.component';
import { HttpClientModule } from '@angular/common/http';
import { BookHeaderComponent } from './book-header/book-header.component';
import { BookFooterComponent } from './book-footer/book-footer.component';
import { BookHomeComponent } from './book-home/book-home.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookItemComponent } from './book-home/book-item/book-item.component';
import { BookRoutingModule } from './book-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { NgxStarsModule } from 'ngx-stars';
import { NgxPaginationModule } from 'ngx-pagination';
import { BookByAuthorComponent } from './book-by-author/book-by-author.component';
import { BookByCategoryComponent } from './book-by-category/book-by-category.component';
import { AuthorHomeComponent } from './author-home/author-home.component';
import { AuthorItemComponent } from './author-home/author-item/author-item.component';
import { AuthorDetailComponent } from './author-detail/author-detail.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FeaturesPageComponent } from './features-page/features-page.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// const routes: Routes = [
//   { path: '', component: BookComponent }
// ];
@NgModule({
  declarations: [
    BookComponent,
    BookHeaderComponent,
    BookFooterComponent,
    BookHomeComponent,
    BookDetailComponent,
    BookItemComponent,
    BookByAuthorComponent,
    BookByCategoryComponent,
    AuthorHomeComponent,
    AuthorItemComponent,
    AuthorDetailComponent,
    AboutUsComponent,
    FeaturesPageComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    BookRoutingModule,
    FormsModule,
    NgxEditorModule,
    NgxStarsModule,
    RouterModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    // RouterModule.forChild(routes)
  ]
})
export class BookModule { }
