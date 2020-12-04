import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/@core/Services/book.service';
import { Book } from 'src/@core/models/book';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-by-author',
  templateUrl: './book-by-author.component.html',
  styleUrls: ['./book-by-author.component.scss']
})
export class BookByAuthorComponent implements OnInit {

  selectedAuthor;
  public book: Book;
  public books: Book[];
  public p;

  constructor(
    public bookService: BookService,
    public router: Router
  ) { }

  ngOnInit() {
    // console.log('To Author View:', this.bookService.selectedAuthor);
    this.selectedAuthor = localStorage.getItem('author');
    if (this.selectedAuthor){
      this.getBookByAuthor();
    } else {
      this.router.navigate(['book']);
    }
  }

  getBookByAuthor() {
    this.bookService.getBookByAuthor(this.selectedAuthor).subscribe(res => {
      console.log('List book', res);
      this.books = res as Book[];
    }, err => {
      console.log(err);
    });
  }


}
