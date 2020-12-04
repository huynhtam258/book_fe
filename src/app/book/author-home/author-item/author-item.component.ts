import { Component, OnInit, Input } from '@angular/core';
import { Author } from 'src/@core/models/author';

@Component({
  selector: 'app-author-item',
  templateUrl: './author-item.component.html',
  styleUrls: ['./author-item.component.scss']
})
export class AuthorItemComponent implements OnInit {
  @Input() public authorinp: Author;
  constructor() { }

  ngOnInit() {
  }

}
