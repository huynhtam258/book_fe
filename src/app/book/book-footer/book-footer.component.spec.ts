import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFooterComponent } from './book-footer.component';

describe('BookFooterComponent', () => {
  let component: BookFooterComponent;
  let fixture: ComponentFixture<BookFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
