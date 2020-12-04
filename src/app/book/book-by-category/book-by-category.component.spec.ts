import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookByCategoryComponent } from './book-by-category.component';

describe('BookByCategoryComponent', () => {
  let component: BookByCategoryComponent;
  let fixture: ComponentFixture<BookByCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookByCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
