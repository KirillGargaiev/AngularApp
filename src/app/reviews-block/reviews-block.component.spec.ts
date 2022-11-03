import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsBlockComponent } from './reviews-block.component';

describe('ReviewsBlockComponent', () => {
  let component: ReviewsBlockComponent;
  let fixture: ComponentFixture<ReviewsBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewsBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
