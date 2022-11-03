import {State, Action, StateContext, Selector, NgxsOnInit} from '@ngxs/store';
import { Category } from '../models/category.model'
import {
  addCategory,
  fetchCategory,
  fetchCategoryFail,
  removeCategory
} from '../actions/category.action'
import {Injectable} from "@angular/core";
import {CategoriesService} from "../../services/categories.service";


export class CategoryStateModel {
  categories!: Category[]
  loading!: boolean
  loaded!: boolean
}

@State<CategoryStateModel>({
  name:'categories',
  defaults: {
    categories: [],
    loading: false,
    loaded: false,

  }
})

@Injectable()

export class CategoryState implements NgxsOnInit{

  constructor(private categoryService: CategoriesService) {
  }

  ngxsOnInit(ctx: StateContext<any>): void {
      ctx.patchState({
        loading: true,
        loaded: false
      })
      this.categoryService.getCategories$().subscribe(
        response => ctx.dispatch(new fetchCategory(response)),
        err => ctx.dispatch(new fetchCategoryFail(err))
      )
    }

  @Selector()
  static getCategories(state: CategoryStateModel){
    return state.categories
  }


  @Selector()
  static loading(state: CategoryStateModel) {
    return state.loading;
  }

  @Selector()
  static loaded(state: CategoryStateModel) {
    return state.loaded;
  }

  @Action(fetchCategory)
  fetch({setState, patchState}: StateContext<CategoryStateModel>, {payload}: fetchCategory){
    setState({
      loaded: true,
      loading: false,
      categories: payload,
    })
  }

  @Action(fetchCategoryFail)
  fetchFail({setState, patchState}: StateContext<CategoryStateModel>, {err}: fetchCategoryFail){
    console.log(err)
  }


  @Action(addCategory)
  add({getState, patchState}: StateContext<CategoryStateModel>, {payload}: addCategory){
    const state = getState();
    patchState({
      loaded: true,
      loading: false,
      categories: [...state.categories, payload]
    })
  }

  @Action(removeCategory)
  remove({getState, patchState}: StateContext<CategoryStateModel>, {payload}: removeCategory){
    patchState({
      loaded: true,
      loading: false,
      categories: getState().categories.filter(el => el.id !== +payload)
    })
  }

}
