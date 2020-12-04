import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from 'src/@core/Services/book.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Author } from 'src/@core/models/author';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss']
})
export class AuthorDetailComponent implements OnInit, OnDestroy {
  public author: Author;
  public sub: any;
  public authorId: string;
  public date;
  public p;

  constructor(
    public bookService: BookService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    console.log(this.route.params);
    this.sub = this.route.params.subscribe(params => {
      console.log(params);
      this.authorId = params['id']; // (+) converts string 'id' to a number
      // this.id = +params['']; // (+) converts string 'id' to a number
    });
    console.log(this.authorId);
    this.getAuthorDetail(this.authorId);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getAuthorDetail(authorId) {
    this.bookService.getAuthorById(authorId).subscribe(res => {
      this.author = res as Author;
      console.log('Author Detail', this.author);
    }, err => {
      console.log(err);
    });
  }

  getAuthor(author) {
    // this.bookService.selectedAuthor = author;
    // console.log(this.bookService.selectedAuthor);
    localStorage.setItem('author', author);
    this.router.navigate(['book/bookByAuthor']);
  }
}
