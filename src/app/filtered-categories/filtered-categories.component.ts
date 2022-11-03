import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Observable, Subscription, take} from "rxjs";
import {Picture} from "../store/models/picture.model";
import {Category} from "../store/models/category.model";
import {Select, Store} from "@ngxs/store";
import {getPictureByCategory} from "../store/actions/picture.actions";
import {PictureState} from "../store/state/picture.state";
import {CategoryState} from "../store/state/category.state";


@Component({
  selector: 'app-filtered-categories',
  templateUrl: './filtered-categories.component.html',
  styleUrls: ['./filtered-categories.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilteredCategoriesComponent implements OnInit, OnDestroy {


  @Select(PictureState.getByCategory) pictures$!: Observable<Picture[]>
  @Select(CategoryState.getCategories) categories$!: Observable<Category[]>
  listView = false
  sub$!: Subscription


  constructor(private store: Store,
              private route: ActivatedRoute)
  {}

  page: number = 1
  count: number = 0;
  tableSize: number = 9;
  tableSizes: any = [3, 6, 9, 12];


  ngOnInit(): void {
    this.sub$ = this.route.params.subscribe((params: Params)=> {
      this.store.dispatch(new getPictureByCategory(params['id']))
    })
  }

  ngOnDestroy() {
    this.sub$.unsubscribe()
  }

  toGridView(){
    this.listView = false
  }

  toListView(){
    this.listView = true;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }


}
