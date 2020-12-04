import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { BookitemComponent } from './bookitem/bookitem.component';
import { BookService } from 'src/@core/Services/book.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxEditorModule } from 'ngx-editor';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BookManagerComponent } from './book-manager/book-manager.component';
import { AuthorManagerComponent } from './author-manager/author-manager.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxStarsModule } from 'ngx-stars';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

@NgModule({
  declarations: [
    AdminComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    BookitemComponent,
    BookManagerComponent,
    AuthorManagerComponent
  ],
  imports: [
    ReactiveFormsModule,
    TypeaheadModule.forRoot(),
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgxEditorModule,
    TooltipModule,
    RouterModule,
    AdminRoutingModule,
    NgxPaginationModule,
    NgxStarsModule,
    Ng2SearchPipeModule,
    NgbModalModule.forRoot()
  ],
  providers: [BookService],
})
export class AdminModule { }
