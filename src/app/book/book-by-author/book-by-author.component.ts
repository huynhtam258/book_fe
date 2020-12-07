import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/@core/Services/book.service';
import { Book } from 'src/@core/models/book';
import { ActivatedRoute, Router } from '@angular/router';

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
  private author: any = {};
  constructor(
    public bookService: BookService,
    public router: Router,
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.selectedAuthor = localStorage.getItem('author');
    // if (this.selectedAuthor){
    //   this.getBookByAuthor();
    // } else {
    //   this.router.navigate(['book']);
    // }
    this.activedRoute.queryParams.subscribe(
      res => {
        if(res.id){
          this.getAuthor(res.id);
          this.getBookByAuthor(res.id);
        }else{
          this.router.navigate(['book']);
        }
      }, error => this.router.navigate(['book'])
    )
  }

  getBookByAuthor(id) {
    this.bookService.getBookByAuthor(id).subscribe(res => {
      console.log('List book', res);
      this.books = res as Book[];
    }, err => {
      console.log(err);
    });
  }

  getAuthor(id){
    this.bookService.getAuthorById(id)
      .subscribe(res => this.author = res)
  }


}
