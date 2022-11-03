import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, reduce, take, throwError} from "rxjs";
import {Picture} from "../store/models/picture.model";
import {Comment} from "../store/models/comment.model";
import {Basket} from "../store/models/basket.model";
import {HttpClient} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private basket = new BehaviorSubject<any>([])
  private basket$: Observable<Picture[]> = this.basket.asObservable()

  private basketTitle = new BehaviorSubject<any>([])

  private basketLength: BehaviorSubject<number> = new BehaviorSubject(0)

  constructor(private http: HttpClient) {
  }


  getLength(): Observable<number>{
    return this.basketLength.asObservable();
  }

  addElement(element: Picture){
    this.basket$.pipe(take(1)).subscribe(
      val=>{
        const newArr = [...val, element]
        this.basket.next(newArr)
      }
    )
  }

  removeElement(element: Picture){
    this.basket$.pipe(take(1)).subscribe(
      val=>{
        const newArr = [...val].filter(el => el.id !== element.id)
        this.basket.next(newArr)
      }
    )
  }

  addToBasket(picture: Picture){
    this.basketLength.next(this.basketLength.value + 1)
    const newarr = [...this.basketTitle.value, picture.title]
    this.basketTitle.next(newarr)
    this.addElement(picture)
  }


  removeFromBasket(picture: Picture){
    this.basketLength.next(this.basketLength.value - 1)
    const newArr = [...this.basketTitle.value].filter(el => el.title === picture.title)
    this.basketTitle.next(newArr)
    this.removeElement(picture)
  }


  getBasket(){
    return this.basket$
  }

  getPrice(): Observable<number>{
    return this.basket$.pipe(
      map(product => product ? product.reduce((acc, element) => acc + element.price, 0): 0)
      )
  }

  getTitles(){
    return this.basketTitle
  }

  addOrder(order: Basket){
    return this.http.post<Basket>(`http://localhost:3001/orders/`, {
      name: order.name,
      surname: order.surname,
      email: order.email,
      phone: order.phone,
      address: order.address,
      city: order.city,
      state: order.state,
      postalCode: order.postalCode,
      pictures: order.pictures,
      price: order.price
    })
  }
}
