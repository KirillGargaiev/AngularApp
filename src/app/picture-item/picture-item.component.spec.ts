import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureItemComponent } from './picture-item.component';
import {NgxsModule} from "@ngxs/store";
import {PictureState} from "../store/state/picture.state";
import {HttpClientModule} from "@angular/common/http";

describe('PictureItemComponent', () => {
  let component: PictureItemComponent;
  let fixture: ComponentFixture<PictureItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureItemComponent ],
      imports: [NgxsModule.forRoot([PictureState]), HttpClientModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PictureItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
