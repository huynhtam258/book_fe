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
      this.authors = res as Author[];
    }, err => {
      console.log(err);
    });
  }

  findAuthor(){
    if(this.searchAuthor.length > 2 ){
      this.bookService.findAuthor(this.searchAuthor.toUpperCase()).subscribe((res: any) => {
        if(res){
          this.authors = []
          this.authors.push(res.value);
        }
      })
    } else if(this.searchAuthor.length == 0){
      this.getAuthors();
    }
    
  }
}
