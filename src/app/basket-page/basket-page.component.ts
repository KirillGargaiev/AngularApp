import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Picture} from "../store/models/picture.model";
import {Select, Store} from "@ngxs/store";
import {BasketState} from "../store/state/basket.state";
import {ChangePictureCountInCart} from "../store/actions/picture.actions";
import {addOrder, removeFromBasket} from "../store/actions/basket.action";

@Component({
  selector: 'app-basket-page',
  templateUrl: './basket-page.component.html',
  styleUrls: ['./basket-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketPageComponent implements OnInit {

  constructor(private store: Store) {
  }

  @Select(BasketState.getBasket)basket$!: Observable<Picture[]>

  price!: number
  form!: FormGroup



  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required])
    })
  }

  incrementAmount(pic: Picture): void {
    if (pic.amount){
      pic.amount += 1
      this.store.dispatch(new ChangePictureCountInCart(pic))
    }
  }

  decrementAmount(pic: Picture): void {
    if (pic.amount == 1){
      this.store.dispatch(new removeFromBasket(pic.id))
    } else if (pic.amount) {
      pic.amount -= 1
    }
  }

  totalPrice(pic: Picture[]){
    this.price = pic.reduce((result, picture) =>
        ({price: result.price + picture.amount! * picture.price}),
      {price: 0}).price;
    return this.price
  }

  submitOrder(pic: Picture[]){
    const order = {...this.form.value, pictures: pic, price: this.price}
    this.store.dispatch(new addOrder(order))
    this.form.reset()
  }

}
