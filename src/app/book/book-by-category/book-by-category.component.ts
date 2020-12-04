import { Component, OnInit } from '@angular/core';
import { Book } from 'src/@core/models/book';
import { Router } from '@angular/router';
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
    public router: Router
  ) { }

  ngOnInit() {
    this.selectedCategory = localStorage.getItem('category');
    if (this.selectedCategory) {
      this.getBookByAuthor();
    } else {
      this.router.navigate(['book']);
    }
  }

  getBookByAuthor() {
    this.bookService.getBookByCategory(this.selectedCategory).subscribe(res => {
      console.log('List book', res);
      this.books = res as Book[];
    }, err => {
      console.log(err);
    });
  }

}
