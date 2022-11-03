import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Select} from "@ngxs/store";
import {CategoryState} from "../store/state/category.state";
import {Observable} from "rxjs";
import {Category} from "../store/models/category.model";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent  {

  constructor() { }

  @Select(CategoryState.getCategories)menuList$!: Observable<Category[]>

}
