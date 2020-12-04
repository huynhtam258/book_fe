import { Component, OnInit } from '@angular/core';
// import { dataBook } from 'src/@core/FakeData/fake_book';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})

export class AdminComponent implements OnInit {
  constructor(public http: HttpClient, public router: Router) {}

  ngOnInit() {

  }
}
