import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredCategoriesComponent } from './filtered-categories.component';
import {NgxsModule} from "@ngxs/store";
import {PictureState} from "../store/state/picture.state";
import {ReviewState} from "../store/state/review.state";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";


describe('FilteredCategoriesComponent', () => {
  let component: FilteredCategoriesComponent;
  let fixture: ComponentFixture<FilteredCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilteredCategoriesComponent ],
      imports: [NgxsModule.forRoot([PictureState, ReviewState]), HttpClientModule, RouterModule.forRoot([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FilteredCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
