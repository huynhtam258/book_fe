import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Book } from 'src/@core/models/book';
import { BookService } from 'src/@core/Services/book.service';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';
import { AdminService } from 'src/@core/Services/admin.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/@core/models/category';
import { ReviewComment } from 'src/@core/models/comment';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Author } from 'src/@core/models/author';
declare var notice: any;

@Component({
  selector: 'app-book-manager',
  templateUrl: './book-manager.component.html',
  styleUrls: ['./book-manager.component.scss'],
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None
})
export class BookManagerComponent implements OnInit {
  public book: Book;
  public books: Book[];
  public date;
  public p1;
  public p2;
  public searchBook;
  public category: Category;
  public categories: Category[];
  public selectedCategory: Category;

  public adminDetail;

  public selectedFile: File;

  private modalBook: any;
  public closeModalBook: string;

  categoryCreate: any;
  editorConfig = {
    editable: true, spellcheck: true, minHeight: '100px', translate: 'no', minwidth: '300px',
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['fontSize', 'color'],
      ['undo', 'redo'],
      ['blockquote', 'removeBlockquote'],
    ]
  };

  public reviewComment: ReviewComment;
  public reviewComments: ReviewComment[];
  public nameBookReview;
  public author: Author;
  public authors: Author[];
  public authorName = [];
  public authorArr: any[] = [];

  private idBook: any = '';
  constructor(public bookService: BookService,
    public adminService: AdminService,
    public router: Router,
    public modalService: NgbModal,
    public datePipe: DatePipe) {
    this.date = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
  }

  listChildComment: any = {};
  dataContentChild: any = {};
  ngOnInit() {
    this.getBooks();
    this.getCategory();
    this.resetFormCategory();
    this.resetForm();
    this.getAuthors();

    // 
    this.bookService.getAuthors().subscribe(
      (res: any) => {
        this.authorArr = res;
      }
    )
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.bookService.selectedBook = {
      _id: null,
      bookId: '',
      bookName: '',
      author: '',
      bookContent: '',
      image: '',
      releaseDate: this.date,
    };
  }
  resetFormCategory(form?: NgForm) {
    if (form)
      form.reset();
    this.selectedCategory = {
      _id: null,
      categoryName: '',
    };
  }

  onSelectedFile(event) {
    this.selectedFile = event.target.files[0];
  }
  onCancleFile() {
    this.selectedFile = undefined;
  }
  onSubmit(form: NgForm, editBook) {
    if(form.value._id){
      this.bookService.putBook(form.value, this.selectedFile)
        .subscribe((res) => { this.getBooks()})
    }else{
      this.bookService.postBook(form.value, this.selectedFile)
        .subscribe((res) => { this.getBooks()})
    }
    this.resetForm();
  }

  onDelete(_id: String, form: NgForm) {
    if (confirm('Are you sure to delete this?') === true) {
      this.bookService.deleteBook(_id).subscribe((res) => {
        this.getBooks();
        this.resetForm(form);
      });
    }
  }
  getBooks() {
    this.bookService.getBook().subscribe(res => {
      this.books = res as Book[];
    }, err => {
      console.log(err);
    });
  }
  getCategory() {
    this.bookService.getCategory().subscribe(res => {
      this.categories = res as Category[];
    }, err => {
      console.log(err);
    });
  }

  getAuthors() {
    this.bookService.getAuthors().subscribe(res => {
      this.authors = res as Author[];
      this.authors.forEach(element => {
        this.authorName.push(element.authorName);
      });
    }, err => {
      console.log(err);
    });
  }
  onEdit(book: any, editBook) {
    console.log(book);
    
    this.bookService.selectedBook = book;
    this.selectedFile = book.image;
    this.modalBook = this.modalService.open(editBook, { windowClass: 'modal-list modal-book' });
    this.modalBook.result.then((result) => {
      this.closeModalBook = `Closed with: ${result}`;
    }, (reason) => {
      this.closeModalBook = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  onCreate(editBook) {
    this.resetForm();
    this.modalBook = this.modalService.open(editBook, { windowClass: 'modal-list modal-book' });
    this.modalBook.result.then((result) => {
      this.closeModalBook = `Closed with: ${result}`;
    }, (reason) => {
      this.closeModalBook = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  onCategory(editCategory) {
    this.modalBook = this.modalService.open(editCategory, { windowClass: 'modal-list' });
    this.modalBook.result.then((result) => {
      this.closeModalBook = `Closed with: ${result}`;
    }, (reason) => {
      this.closeModalBook = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  onEditCategory(category: Category) {
    this.selectedCategory = category;
  }
  onSubmitCategory(form: NgForm) {
    if (form.value.categoryid == null) {
      this.bookService.postCategory(form.value).subscribe((res) => {
        this.resetFormCategory();
        this.getCategory();
      });
    } else {
      this.bookService.putCategory(form.value).subscribe((res) => {
        this.resetFormCategory();
        this.getCategory();
      });
    }
  }

  onDeleteCategory(_id: String) {
    if (confirm('Are you sure to delete this?') === true) {
      this.bookService.deleteCategory(_id).subscribe((res) => {
        this.getCategory();
      });
    }
  }
  onShowComment(bookId, bookName, commentView) {
    this.idBook = bookId;
    this.nameBookReview = bookName;
    this.getComments(bookId);
    this.modalBook = this.modalService.open(commentView, { windowClass: 'modal-list modalComManage' });
    this.modalBook.result.then((result) => {
      this.closeModalBook = `Closed with: ${result}`;
    }, (reason) => {
      this.closeModalBook = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  getComments(bookId) {
    this.idBook = bookId;
    this.bookService.getComment(bookId).subscribe(res => {
      this.reviewComments = res as ReviewComment[];
      this.reviewComments.map(res => this.getChildComment(res._id))
    }, err => {
      console.log(err);
    });
  }
  onDeleteComment(cmtId, bookId) {
    if (confirm('Are you sure to delete this?') === true) {
      this.bookService.deleteComment(cmtId).subscribe((res) => {
        this.getComments(bookId);
      });
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  sendComment(data) {
    let id_user = localStorage.getItem('id');
    let contentChild = this.dataContentChild[data._id];
    let id_comment = data._id
    this.bookService.sendCommentChild({ id_comment, contentChild, id_user, date: '' })
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
}
