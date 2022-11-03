
import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {BasketState} from "../store/state/basket.state";
import {basketLengthAnimation} from "../app.animations";
import {Picture} from "../store/models/picture.model";
import {setFilterText} from "../store/actions/picture.actions";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [basketLengthAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush ,
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private store: Store, private renderer2: Renderer2) {
  }

  @Select(BasketState.getBasketLength)basketLength$!: Observable<number>
  @Select(BasketState.getBasket)basket$!: Observable<Picture[]>
  basketText!: string
  searchText!: string
  basketModal = false
  sub$!: Subscription


  ngOnInit() {
    this.sub$ = this.basketLength$.subscribe(
      response =>
        this.basketText = `${response} pictures in basket`
    )
  }


  ngOnDestroy(){
    this.sub$.unsubscribe()
  }


  showBasket(){
    this.basketModal = true
  }

  closeBasket(){
    this.basketModal = false
  }

  filterPictures(){
    this.store.dispatch(new setFilterText(this.searchText))
  }

}
