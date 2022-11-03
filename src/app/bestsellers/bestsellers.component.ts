import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { Observable} from 'rxjs'
import {CategoryState} from "../store/state/category.state";
import {Category} from "../store/models/category.model";
import {Select, Store} from "@ngxs/store";
import {getBestsellers} from "../store/actions/picture.actions";
import {PictureState} from "../store/state/picture.state";
import {Picture} from "../store/models/picture.model";

@Component({
  selector: 'app-bestsellers',
  templateUrl: './bestsellers.component.html',
  styleUrls: ['./bestsellers.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BestsellersComponent implements OnInit{


  constructor(private store: Store) {
  }

  @Select(CategoryState.getCategories)menu$!: Observable<Category[]>
  @Select(PictureState.getBestsellers)arr$!: Observable<Picture[]>


  ngOnInit() {
    this.store.dispatch(new getBestsellers())
  }




}

