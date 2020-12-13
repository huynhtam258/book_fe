import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdminService } from 'src/@core/Services/admin.service';
import { Router } from '@angular/router';
import { Category } from 'src/@core/models/category';
import { BookService } from 'src/@core/Services/book.service';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as $ from 'jquery';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Admin } from 'src/@core/models/admin';
import { AppHelper } from 'src/@core/app.help';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None
})
export class AdminHeaderComponent implements OnInit {
  private modalBook: any;
  public closeModalBook: string;
  public date;
  public p;
  public category: Category;
  public categories: Category[];
  public selectedCategory: Category;
  public showInputDiv = false;
  public adminGet: Admin;
  constructor(
    public adminService: AdminService,
    public router: Router,
    public bookService: BookService,
    public modalService: NgbModal,
    public datePipe: DatePipe) {
    this.date = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
  }

  ngOnInit() {
    // this.getAdmin();
    this.getCategory();
    this.resetFormCategory();
  }

  resetFormCategory(form?: NgForm) {
    // tslint:disable-next-line:curly
    if (form)
      form.reset();
    this.selectedCategory = {
      _id: null,
      categoryName: '',
    };
  }
  getCategory() {
    this.bookService.getCategory().subscribe(res => {
      this.categories = res as Category[];
    }, err => {
      console.log(err);
    });
  }
  
  onCategory(editCategory) {
    this.modalBook = this.modalService.open(editCategory, { windowClass: 'modal-list modal-category' });
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
    console.log('Category: ', form.value);
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
    this.showInputDiv = !this.showInputDiv;
  }

  onDeleteCategory(_id: String) {
    if (confirm('Are you sure to delete this?') === true) {
      this.bookService.deleteCategory(_id).subscribe((res) => {
        this.getCategory();
      });
    }
  }

  onLogOut(content) {
    this.modalBook = this.modalService.open(content, { windowClass: 'modal-list modal-logout' });
    this.modalBook.result.then((result) => {
      this.closeModalBook = `Closed with: ${result}`;
    }, (reason) => {
      this.closeModalBook = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  logOutAdmin() {
    this.adminService.deleteToken();
    this.router.navigate([AppHelper.ROUTER_NAVIGATE_PAGE]);
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
