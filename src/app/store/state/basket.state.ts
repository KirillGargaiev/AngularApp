import {State, Action, StateContext, Selector, NgxsOnInit} from '@ngxs/store';
import {Injectable} from "@angular/core";
import {Picture} from "../models/picture.model";
import {addOrder, addOrderFail, addOrderSuccess, addToBasket, removeFromBasket} from "../actions/basket.action";
import {ChangePictureCountInCart} from "../actions/picture.actions";
import {BasketService} from "../../services/basket.service";

export class BasketStateModel {
  basket!: Picture[]
}

@State<BasketStateModel>({
  name: 'basket',
  defaults:{
    basket:[]
  }
})

@Injectable()

export class BasketState implements NgxsOnInit {

  constructor(private  basketService: BasketService) {
  }

  ngxsOnInit(ctx: StateContext<any>): void {
  }

  @Selector()
  static getBasket(state: BasketStateModel){
    return state.basket
  }

  @Selector()
  static getBasketLength(state: BasketStateModel){
    return state.basket.length
  }

  @Selector()
  static getBasketTitles(state: BasketStateModel){
    return state.basket.filter(el => el.title)
  }




  @Action(addToBasket)
  addToBasket(ctx:StateContext<BasketStateModel>, {element}: addToBasket){
    const state = ctx.getState()
    element.amount = 1
    ctx.patchState({
      basket: [...state.basket, element]
    })
  }

  @Action(removeFromBasket)
  removeFromBasket(ctx:StateContext<BasketStateModel>, {id}: removeFromBasket){
    const state = ctx.getState().basket.filter(el => el.id!== id)
    ctx.setState({
      basket: [...state]
    })
  }

  @Action(ChangePictureCountInCart)
  ChangePictureCountInCart(ctx: StateContext<BasketStateModel>, {data}: ChangePictureCountInCart) {
    const state = ctx.getState().basket.filter(el => el.id!== data.id)
    ctx.setState({
      basket: [...state, data]
    })
  }

  @Action(addOrder)
  addOrder(ctx: StateContext<BasketStateModel>, {payload}: addOrder){
    this.basketService.addOrder(payload).subscribe(
      response => ctx.dispatch(new addOrderSuccess()),
      err => ctx.dispatch(new addOrderFail(err))
    )
  }

  @Action(addOrderSuccess)
  addOrderSuccess(ctx: StateContext<BasketStateModel>){
    ctx.setState({
      basket: []
    })
  }

  @Action(addOrderFail)
  addOrderFail(ctx: StateContext<BasketStateModel>, {err}: addOrderFail){
    console.log(err)
  }
}
