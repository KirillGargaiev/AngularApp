import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlodPosterComponent } from './blod-poster.component';

describe('BlodPosterComponent', () => {
  let component: BlodPosterComponent;
  let fixture: ComponentFixture<BlodPosterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlodPosterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlodPosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
