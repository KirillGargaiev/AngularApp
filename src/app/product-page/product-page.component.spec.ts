import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPageComponent } from './product-page.component';
import {NgxsModule, StateStream, Store} from "@ngxs/store";
import {PictureState} from "../store/state/picture.state";
import {ReviewState} from "../store/state/review.state";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";


describe('ProductPageComponent', () => {
  let component: ProductPageComponent;
  let fixture: ComponentFixture<ProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPageComponent ],
      imports: [NgxsModule.forRoot([PictureState, ReviewState]), HttpClientModule, RouterModule.forRoot([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
