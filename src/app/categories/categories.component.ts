import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Category} from "../store/models/category.model";
import {Picture} from "../store/models/picture.model";
import {Select} from "@ngxs/store";
import {PictureState} from "../store/state/picture.state";
import {CategoryState} from "../store/state/category.state";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit {


  @Select(PictureState.getCurrentPictures) pictures$!: Observable<Picture[]>
  @Select(CategoryState.getCategories) categories$!: Observable<Category[]>
  listView = false

  page: number = 1
  count: number = 0;
  tableSize: number = 9;
  tableSizes: any = [3, 6, 9, 12];
  rating_5 = false
  rating_4 = false
  rating_3 = false
  rating_2 = false
  rating_1 = false


  toGridView(){
    this.listView = false
  }

  toListView() {
    this.listView = true;
  }

  ngOnInit(): void {
    const grade5 = new FormControl();
    const grade4 = new FormControl();
    const grade3 = new FormControl();
    const grade2 = new FormControl();
    const grade1 = new FormControl();

  }

  submit(): void {
    const rating = [this.rating_1,this.rating_2,this.rating_3,this.rating_4,this.rating_5]

  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }


}
