import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularComponent } from './popular.component';
import {NgxsModule} from "@ngxs/store";
import {HttpClientModule} from "@angular/common/http";
import {PictureState} from "../store/state/picture.state";
import {ReviewState} from "../store/state/review.state";

describe('PopularComponent', () => {
  let component: PopularComponent;
  let fixture: ComponentFixture<PopularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularComponent ],
      imports: [NgxsModule.forRoot([PictureState]), HttpClientModule,]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
