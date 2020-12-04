import { Component, OnInit, Input } from '@angular/core';

import { Book } from 'src/@core/models/book';

@Component({
  selector: 'app-bookitem',
  templateUrl: './bookitem.component.html',
  styleUrls: ['./bookitem.component.scss']
})
export class BookitemComponent implements OnInit {
  @Input() public bookinp: Book;
  constructor() { }
  ngOnInit() {
  }

}
