import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketPageComponent } from './basket-page.component';
import {NgxsModule} from "@ngxs/store";
import {BasketState} from "../store/state/basket.state";

describe('BasketPageComponent', () => {
  let component: BasketPageComponent;
  let fixture: ComponentFixture<BasketPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasketPageComponent ],
      imports: [NgxsModule.forRoot([BasketState])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BasketPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should create form',()=>{
    expect(component.form.contains('name')).toBeTruthy()
    expect(component.form.contains('surname')).toBeTruthy()
    expect(component.form.contains('email')).toBeTruthy()
    expect(component.form.contains('phone')).toBeTruthy()
    expect(component.form.contains('address')).toBeTruthy()
    expect(component.form.contains('city')).toBeTruthy()
    expect(component.form.contains('state')).toBeTruthy()
    expect(component.form.contains('postalCode')).toBeTruthy()
  })

  it('check validators', ()=>{
    const name = component.form.get('name')
    name?.setValue('')
    expect(name?.valid).toBeFalsy()
    const surname = component.form.get('surname')
    surname?.setValue('')
    expect(surname?.valid).toBeFalsy()
    const email = component.form.get('email')
    email?.setValue('')
    expect(email?.valid).toBeFalsy()
    const phone = component.form.get('phone')
    phone?.setValue('')
    expect(phone?.valid).toBeFalsy()
    const address = component.form.get('address')
    address?.setValue('')
    expect(address?.valid).toBeFalsy()
    const city = component.form.get('city')
    city?.setValue('')
    expect(city?.valid).toBeFalsy()
    const state = component.form.get('state')
    state?.setValue('')
    expect(state?.valid).toBeFalsy()
    const postalCode = component.form.get('postalCode')
    postalCode?.setValue('')
    expect(postalCode?.valid).toBeFalsy()
  })
});
