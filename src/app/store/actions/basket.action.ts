import {Picture} from "../models/picture.model";
import {Basket} from "../models/basket.model";

export class addToBasket{
  static readonly type = '[Basket] Add Element'

  constructor(public element: Picture) {
  }
}

export class removeFromBasket{
  static readonly type = '[Basket] Remove Element'

  constructor(public id: number) {
  }
}

export class addOrder{
  static readonly type = '[Basket] Add Order'

  constructor(public payload: Basket) {
  }
}

export class addOrderSuccess{
  static readonly type = '[Basket] Add Order Success'

}

export class addOrderFail{
  static readonly type = '[Basket] Add Order Fail'

  constructor(public err: any) {
  }
}


