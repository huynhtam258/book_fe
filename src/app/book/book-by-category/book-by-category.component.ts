import { Component, OnInit } from '@angular/core';
import { Book } from 'src/@core/models/book';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/@core/Services/book.service';

@Component({
  selector: 'app-book-by-category',
  templateUrl: './book-by-category.component.html',
  styleUrls: ['./book-by-category.component.scss']
})
export class BookByCategoryComponent implements OnInit {
  selectedCategory;
  public book: Book;
  public books: Book[];
  public p;
  constructor(
    public bookService: BookService,
    public router: Router,
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activedRoute.queryParams.subscribe(res =>{
      if(res.id && res.nameCategory){
        this.selectedCategory = res.nameCategory;
        this.getBookByAuthor(res.id);
        return;
      }
      this.router.navigate(['book']);
    })
  }

  getBookByAuthor(id) {
    this.bookService.getBookByCategory(id).subscribe((res: any) => {
      this.books = res.data as Book[];
    }, err => {
      console.log(err);
    });
  }

}
