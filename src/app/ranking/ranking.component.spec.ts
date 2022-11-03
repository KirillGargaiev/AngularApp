import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingComponent } from './ranking.component';
import {NgxsModule} from "@ngxs/store";
import {PictureState} from "../store/state/picture.state";
import {HttpClientModule} from "@angular/common/http";

describe('RankingComponent', () => {
  let component: RankingComponent;
  let fixture: ComponentFixture<RankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankingComponent ],
      imports: [NgxsModule.forRoot([PictureState]), HttpClientModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
