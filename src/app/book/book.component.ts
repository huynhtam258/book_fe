import { Component, OnInit } from '@angular/core';
import { Book } from 'src/@core/models/book';
// import { dataBook } from 'src/@core/FakeData/fake_book';
// import {BookService} from '../../@core/Services/book.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  constructor(public http: HttpClient, public router: Router) { }

  ngOnInit() {
  }
}
