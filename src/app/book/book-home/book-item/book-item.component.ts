import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/@core/models/book';
import { BookService } from 'src/@core/Services/book.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent implements OnInit {
  @Input() public bookinp: Book;

  constructor(public bookService: BookService) { }

  ngOnInit() {
    console.log(this.bookinp);
  }

  // goDetail(id: string){
  //   console.log(id);
  //   // this.bookService.getBookById(id).subscribe(res)
  // }

}
