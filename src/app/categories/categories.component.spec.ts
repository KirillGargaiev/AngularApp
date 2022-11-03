import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesComponent } from './categories.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {NgxsModule} from "@ngxs/store";
import {CategoryState} from "../store/state/category.state";

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesComponent ],
      providers: [HttpClient, HttpHandler],
      imports: [NgxsModule.forRoot([CategoryState])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change view to list', ()=>{
    component.toListView()
    expect(component.listView).toBeTruthy()
  })

  it('should change view to grid', ()=>{
    component.toGridView()
    expect(component.listView).toBeFalsy()
  })
});
