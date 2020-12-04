import { Component, OnInit } from '@angular/core';
import { Author } from 'src/@core/models/author';
import { BookService } from 'src/@core/Services/book.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-home',
  templateUrl: './author-home.component.html',
  styleUrls: ['./author-home.component.scss']
})
export class AuthorHomeComponent implements OnInit {
  public searchAuthor;
  public author: Author;
  public authors: Author[];
  public p;
  constructor(public bookService: BookService, public http: HttpClient, public router: Router) { }

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors() {
    this.bookService.getAuthors().subscribe(res => {
      console.log('List author', res);
      this.authors = res as Author[];
    }, err => {
      console.log(err);
    });
  }
}
