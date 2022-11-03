import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Picture} from "../store/models/picture.model";
import {Category} from "../store/models/category.model";
import {CategoryState} from "../store/state/category.state";
import {Select, Store} from "@ngxs/store";
import {getRankings} from "../store/actions/picture.actions";
import {PictureState} from "../store/state/picture.state";


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RankingComponent implements OnInit{

  constructor(private store: Store) {
  }

  @Select(CategoryState.getCategories)menu$!: Observable<Category[]>
  @Select(PictureState.getRankings)arr$!: Observable<Picture[]>

  ngOnInit(): void {
    this.store.dispatch(new getRankings())
  }


}
