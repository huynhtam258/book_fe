import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Author } from 'src/@core/models/author';
import { BookService } from 'src/@core/Services/book.service';
import { AdminService } from 'src/@core/Services/admin.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Category } from 'src/@core/models/category';
import { UploadService } from 'src/@core/Services/upload-file.service';

@Component({
  selector: 'app-author-manager',
  templateUrl: './author-manager.component.html',
  styleUrls: ['./author-manager.component.scss'],
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None
})
export class AuthorManagerComponent implements OnInit {
  private modalBook: any;
  public closeModalBook: string;
  public author: Author;
  public authors: Author[];
  public date;
  public p;
  public searchAuthor;
  public selectedFile: File;
  public category: Category;
  public categories: Category[];
  public selectedCategory: Category;
  editorConfig = {
    editable: true, spellcheck: true, minHeight: '100px', translate: 'no', minwidth: '300px',
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['fontSize', 'color'],
      ['undo', 'redo'],
      ['blockquote', 'removeBlockquote'],
    ]
  };
  constructor(public bookService: BookService,
    public adminService: AdminService,
    public router: Router,
    public modalService: NgbModal,
    public datePipe: DatePipe,
    private uploadService: UploadService) {
    this.date = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
  }

  ngOnInit() {
    this.getAuthors();
    this.getCategory();
  }

  getAuthors() {
    this.bookService.getAuthors().subscribe(res => {
      this.authors = res as Author[];
    }, err => {
      console.log(err);
    });
  }

  resetForm(form?: NgForm) {
    // tslint:disable-next-line:curly
    if (form)
      form.reset();
    this.bookService.selectedAuthor = {
      _id: null,
      authorName: '',
      quote: '',
      category: '',
      interviewContent: '',
      image: '',
      releaseDate: this.date,
    };
  }
  onCreate(editAuthor) {
    this.resetForm();
    this.modalBook = this.modalService.open(editAuthor, { windowClass: 'modal-list modal-author' });
    this.modalBook.result.then((result) => {
      this.closeModalBook = `Closed with: ${result}`;
    }, (reason) => {
      this.closeModalBook = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  onSelectedFile(event) {
    this.selectedFile = event.target.files[0];
    this.uploadService.onFileSelected(event);
  }
  onCancleFile() {
    this.selectedFile = undefined;
  }
  onSubmit(form: NgForm) {
    this.uploadService.fb.subscribe(res=>{
      if (form.value._id == null) {
        this.bookService.postAuthor(form.value, res).subscribe((res) => {
            this.resetForm(form);
            this.getAuthors();
            // this.selectedFile = undefined;
        });
      } else {
        this.bookService.putAuthor(form.value, res).subscribe((res) => {
            this.resetForm(form);
            this.getAuthors();
            // this.selectedFile = undefined;
        });
      }
    })
  }
  onEdit(author: any, editAuthor) {
    this.bookService.selectedAuthor = author;
    console.log(author)
    this.bookService.selectedAuthor.category = author.category._id;
    this.selectedFile = author.image;
    this.modalBook = this.modalService.open(editAuthor, { windowClass: 'modal-list modal-author' });
    this.modalBook.result.then((result) => {
      this.closeModalBook = `Closed with: ${result}`;
    }, (reason) => {
      this.closeModalBook = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  onDelete(_id: String, form: NgForm) {
    console.log('a')
    this.bookService.deleteAuthor(_id).subscribe((res) => {
      console.log(res)
      this.getAuthors();
      this.resetForm(form);
    });
    // if (confirm('Are you sure to delete this?') === true) {
      
    // }
  }

  getCategory() {
    this.bookService.getCategory().subscribe(res => {
      this.categories = res as Category[];
    }, err => {
      console.log(err);
    });
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

}
