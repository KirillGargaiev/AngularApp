import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Picture} from "../store/models/picture.model";
import {Select, Store} from "@ngxs/store";
import {CategoryState} from "../store/state/category.state";
import {Observable} from "rxjs";
import {Category} from "../store/models/category.model";
import {getPopular} from "../store/actions/picture.actions";
import {PictureState} from "../store/state/picture.state";

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopularComponent implements OnInit{


  constructor(private store: Store) {
  }

  @Select(CategoryState.getCategories)menu$!: Observable<Category[]>
  @Select(PictureState.getPopular)arr$!: Observable<Picture[]>

  ngOnInit() {
    this.store.dispatch(new getPopular())
  }

}
