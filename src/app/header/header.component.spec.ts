import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {PhoneNumberPipe} from "../pipes/phone-number.pipe";
import {NgxsModule} from "@ngxs/store";
import {CategoryState} from "../store/state/category.state";
import {HttpClient, HttpHandler} from "@angular/common/http";


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent, PhoneNumberPipe ],
      providers:[HttpClient, HttpHandler],
      imports: [NgxsModule.forRoot([CategoryState])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('basket text is not empty', ()=>{
    expect(component.basketText.length > 0).toBeTruthy()
  })
});
