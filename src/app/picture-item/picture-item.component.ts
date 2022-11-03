import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {BasketService} from "../services/basket.service";
import {Picture} from "../store/models/picture.model";
import {Store} from "@ngxs/store";
import {addToBasket, removeFromBasket} from "../store/actions/basket.action";
import {pictureItemAnimation} from "../app.animations";

const imgE = '/assets/pictures/picture_18011_471.jpg'


@Component({
  selector: 'app-picture-item',
  templateUrl: './picture-item.component.html',
  styleUrls: ['./picture-item.component.css'],
  animations:[pictureItemAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PictureItemComponent implements OnInit{

  @Input() pic: Picture = {
    id: 0,
    img: imgE,
    title: '',
    author: '',
    year: 0,
    price: 0,
    inBasket: false,
    reviews: []
  }


  constructor(private basketService: BasketService,
              private store: Store) { }

  ngOnInit(){
    this.pic.inBasket = this.basketService.getTitles().value.includes(this.pic.title) ;
  }

  addToBasket(){
    this.basketService.addToBasket(this.pic)
    this.store.dispatch(new addToBasket(this.pic))
    this.pic.inBasket = true
  }

  removeFromBasket(){
    this.basketService.removeFromBasket(this.pic)
    this.store.dispatch(new removeFromBasket(this.pic.id))
    this.pic.inBasket = false
  }



}
