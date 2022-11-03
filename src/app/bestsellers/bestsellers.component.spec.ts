import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestsellersComponent } from './bestsellers.component';
import {NgxsModule, StateStream, Store} from "@ngxs/store";
import {PictureState} from "../store/state/picture.state";
import {ReviewState} from "../store/state/review.state";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";

describe('BestsellersComponent', () => {
  let component: BestsellersComponent;
  let fixture: ComponentFixture<BestsellersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestsellersComponent ],
      imports: [NgxsModule.forRoot([PictureState]), HttpClientModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BestsellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
