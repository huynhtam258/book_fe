import { Component, OnInit } from '@angular/core';
import { Category } from 'src/@core/models/category';
import { BookService } from 'src/@core/Services/book.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/@core/Services/global.service';
import { AppHelper } from 'src/@core/app.help';

@Component({
  selector: 'app-book-header',
  templateUrl: './book-header.component.html',
  styleUrls: ['./book-header.component.scss']
})
export class BookHeaderComponent implements OnInit {
  public category: Category;
  public categories: Category[];
  nameUser: any = '';
  constructor(public bookService: BookService, public router: Router, private gb: GlobalService) { }

  ngOnInit() {
    this.getCategorys();
    this.getProfile();
  }
  getCategorys() {
    this.bookService.getCategory().subscribe(res => {
      this.categories = res as Category[];
    }, err => {
      console.log(err);
    });
  }
  getCategory(category) {
    // localStorage.setItem('category', category);
    this.router.navigateByUrl('/DummyComponent', {skipLocationChange: true}).then(() =>
    this.router.navigate([AppHelper.ROUTER_NAVIGATE_BOOK_BY_CATEGORY], {queryParams: {
      id: category._id,
      nameCategory: category.categoryName
    }}));
  }

  login(){
    this.router.navigate([AppHelper.ROUTER_NAVIGATE_LOGIN]);
  }
  getProfile(){
    this.gb.handler.subscribe(res => {
      if(res.firstname && res.lastname){
        this.nameUser = res.firstname + ' ' + res.lastname;
      }
    })
  }
  
  logOut(){
    localStorage.clear();
    this.gb.handler.next({});
    this.router.navigate(['/']);
  }

}
