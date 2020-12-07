import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/@core/Services/book.service';
import { Book } from 'src/@core/models/book';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-home',
  templateUrl: './book-home.component.html',
  styleUrls: ['./book-home.component.scss']
})
export class BookHomeComponent implements OnInit {
  public searchBook;
  public book: Book;
  public books: Book[];
  // public p;
  constructor(public bookService: BookService, public http: HttpClient, public router: Router) { }

  ngOnInit() {
    this.getBooks();
  }
  getBooks() {
    this.bookService.getBook().subscribe(res => {
      this.books = res as Book[];
    }, err => {
      console.log(err);
    });
  }

}
