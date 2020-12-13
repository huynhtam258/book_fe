import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from 'src/@core/Services/book.service';
import { Book } from 'src/@core/models/book';
import { ReviewComment } from 'src/@core/models/comment';
import { ActivatedRoute } from '@angular/router';
import { NgForm, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AdminService } from 'src/@core/Services/admin.service';
import { GlobalService } from 'src/@core/Services/global.service';
import { AppHelper } from 'src/@core/app.help';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
  providers: [DatePipe]
})
export class BookDetailComponent implements OnInit, OnDestroy {
  public book: Book;
  public sub: any;
  public bookId: string;
  public date;
  public averageRate: number;
  public totalRate: any;
  public reviewComment: any;
  public reviewComments: ReviewComment[];
  // public p;
  editorConfig = {
    editable: true, spellcheck: true, minHeight: '100px', translate: 'no', minwidth: '300px'
  };
  user: any = {}
  idUser: any = localStorage.getItem('id');
  listChildComment: any = {};
  dataContentChild: any ={}
  a = {};
  constructor(
      public bookService: BookService,
      public route: ActivatedRoute,
      public datePipe: DatePipe,
      public router: Router,
      private adminService: AdminService,
      private gb: GlobalService
    ) {
    this.date = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.bookId = params['id'];
    });
    this.getBooksDetail(this.bookId);
    // this.getComments(this.bookId);
    this.resetForm();
    this.getUser();
    
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getUser(){
    this.gb.handler.subscribe((res) => { this.user = res });
  }

  getBooksDetail(bookId) {
    this.bookService.getBookById(bookId).subscribe(res => {
      this.book = res as Book;
      this.getComments(bookId)
    }, err => {
      console.log(err);
    });
  }

  getComments(bookId) {
    this.bookService.getComment(bookId).subscribe(res => {
      this.reviewComments = res as ReviewComment[];
      console.log(this.reviewComments)
      if(res){
        res.map((result) => {
          this.getChildComment(result._id)
        });
      }
      // this.totalRate = this.reviewComments.map(function (a) {
      //   return a['rate'];
      // });
      // this.averageRate = (Math.round((this.totalRate.reduce((acc, cur) => acc + cur, 0) / this.reviewComments.length) / 0.5) * 0.5);
    }, err => {
      console.log(err);
    });
  }

  onComment(form: NgForm) {
    let childReviewer: any = [];
    if (form.value.bookId !== '' && form.valid) {
      let data = { nameReviwer: localStorage.getItem('id'), ...form.value, childReviewer }
      this.bookService.postComment(data).subscribe((res) => {
        // form.reset();
        this.resetForm();
        this.getComments(this.bookId);
      });
    } else {
      console.log('Error');
    }
  }

  onRatingSet(rating: number) {
    this.reviewComment.rate = rating;
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.reviewComment = {
      _id: null,
      bookId: this.bookId,
      nameReviwer: '',
      contentcomment: '',
      date: this.date,
      // rate: '',
    };
  }

  /* #region How this page work */
  // First, we need to add path | 'detail/:id' | to routing module.
  // Second, we have | [routerLink]="['detail', bookinp._id]" | from book.item, it's mean
  // when we click this, it'll routing to detail page (book/detail/id) with id we get from bookinp
  // (@Input from) book.home. It'll take this ID and routing to detail page.
  // Third, when this ID go to detail component, it'll be in a params, we use subscribe to get the ID
  // that sent form book.item and put it into getBooksDetail(bookId) func. This func will take the ID
  // we put in and send it to service, service will run func getBookById(id) and return a response.
  /* #endregion */

  getAuthor(author) {
    localStorage.setItem('author', author);
    this.router.navigate([AppHelper.ROUTER_NAVIGATE_BOOK_BY_AUTHOR]);
  }
  getCategory(category) {
    localStorage.setItem('category', category);
    this.router.navigate(['book/bookByCategory']);
  }

  sendComment(data) {
    let id_user = localStorage.getItem('id');
    let contentChild = this.dataContentChild[data._id];
    let id_comment = data._id
    this.bookService.sendCommentChild({ id_comment, contentChild, id_user, date: '2015-03-25T00:00:00.000Z' })
      .subscribe(
        (res) => {
          this.getChildComment(id_comment);
          this.dataContentChild[data._id] = "";
        })
  }

  getChildComment(id){
    this.bookService.getChildComment(id).subscribe(
      (res) => { 
        Object.keys(this.listChildComment).push(id);
        this.listChildComment[id] = res;
      }
    )
  }

  deleteComment(id) {
    this.bookService.deleteComment(id).subscribe(
      (res) => {  this.getComments(this.bookId)},
      (error) => { console.log(error) })
      
  }

  deleteChildComment(id, idComment){
    this.bookService.deleteChildComment(id).subscribe(
      (res) => { this.getChildComment(idComment) },
      (error) => console.log(error)
    )
  }
}
