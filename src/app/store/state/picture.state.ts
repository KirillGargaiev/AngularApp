import {State, Action, StateContext, Selector, NgxsOnInit} from '@ngxs/store';
import {Injectable} from "@angular/core";
import {Picture} from "../models/picture.model";
import {CategoriesService} from "../../services/categories.service";
import {
  getAllPictures,
  getPicture,
  getPictureSuccess,
  getPictureFail,
  getPictureByCategory,
  getPictureByCategorySuccess,
  getPictureByCategoryFail,
  getBestsellers,
  getBestsellersSuccess,
  getBestsellersFail,
  getRankings,
  getRankingsFail,
  getRankingsSuccess,
  getPopular,
  getPopularSuccess,
  getPopularFail, setFilterText, filterByScore
} from "../actions/picture.actions";
import {interval, map, startWith, switchMap} from "rxjs";



export class PictureStateModel {
  pictures!: Picture[]
  bestsellers!: Picture[]
  rankings!:Picture[]
  popular!:Picture[]
  byCategory!: Picture[]
  byId!: Picture | undefined
  loading!: boolean
  loaded!: boolean
  currentPictures!: Picture[]
}

@State<PictureStateModel>({
  name: 'pictures',
  defaults:{
    pictures:[],
    currentPictures: [],
    bestsellers:[],
    rankings:[],
    popular:[],
    byCategory: [],
    byId: undefined,
    loading: false,
    loaded: false
  }
})

@Injectable()

export class PictureState implements NgxsOnInit {

  constructor(private categoriesService: CategoriesService) {
  }

  ngxsOnInit(ctx: StateContext<any>): void {

    let iterations = -1;
    const stream$ = interval(1500);

    ctx.patchState({
      loading: true,
      loaded: false
    })
    this.categoriesService.getPictures().subscribe(
      response => ctx.dispatch(new getAllPictures(response))
    )
    this.categoriesService.getBestsellers$()
      .pipe(
        switchMap(paintings => {
          return stream$
            .pipe(
              startWith(paintings),
              map(() => {
                iterations++;
                const first = paintings[iterations % (paintings.length)];
                const second = paintings[(iterations + 1) % (paintings.length)];
                const third = paintings[(iterations + 2) % (paintings.length)];
                return [first, second, third];
              })
            );
        })
      ).subscribe(
        response => ctx.dispatch(new getBestsellersSuccess(response)),
      err => ctx.dispatch(new getBestsellersFail(err))
    )
  }

  @Selector()
  static getPictures(state: PictureStateModel) {
    return state.pictures
  }

  @Selector()
  static getCurrentPictures(state: PictureStateModel) {
    return state.currentPictures
  }

  @Selector()
  static getPicture(state: PictureStateModel){
    return state.byId
  }

  @Selector()
  static getBestsellers(state: PictureStateModel) {
    return state.bestsellers
  }

  @Selector()
  static getRankings(state: PictureStateModel){
    return state.rankings
  }

  @Selector()
  static getPopular(state: PictureStateModel) {
    return state.popular
  }

  @Selector()
  static getByCategory(state: PictureStateModel){
    return state.byCategory
  }

  @Action(getAllPictures)
  getAll(ctx: StateContext<PictureStateModel>, {payload}: getAllPictures){
    const pictures = payload
    ctx.patchState({
      pictures: payload,
      currentPictures: payload,
      loaded: true,
      loading: false
    })
  }

  @Action(getPicture)
  getPicture(ctx: StateContext<PictureStateModel>, {payload}: getPicture){
    ctx.patchState({
      loading: true,
      loaded: false
    })
    this.categoriesService.getById(payload).subscribe(
      response => ctx.dispatch(new getPictureSuccess(response)),
      err => ctx.dispatch(new getPictureFail(err))
    )
  }

  @Action(getPictureSuccess)
  getPictureSuccess({setState, patchState}: StateContext<PictureStateModel>, {payload}: getPictureSuccess){
    patchState({
      loading: false,
      loaded: true,
      byId: payload,
    })
  }

  @Action(getPictureFail)
  getPictureFail({setState, patchState}: StateContext<PictureStateModel>, {err}: getPictureFail){
    console.log(err)
  }

  @Action(getPictureByCategory)
  getPictureByCategory(ctx: StateContext<PictureStateModel>, {id}:getPictureByCategory){
    ctx.patchState({
      loaded: false,
      loading: true
    })
    this.categoriesService.getProductsByCategories$(id).subscribe(
      response => ctx.dispatch(new getPictureByCategorySuccess(response)),
      err => ctx.dispatch(new getPictureByCategoryFail(err))
    )
  }

  @Action(getPictureByCategorySuccess)
  getPictureByCategorySuccess(ctx: StateContext<PictureStateModel>, {payload}: getPictureByCategorySuccess){
    if (ctx.getState().currentPictures.length > 0){
      const pictures = payload.filter(el => ctx.getState().currentPictures.some(item => item.id === el.id))
      ctx.patchState({
        loading: false,
        loaded: true,
        byCategory: [...pictures]
      })
    } else {
      ctx.patchState({
        loading: false,
        loaded: true,
        byCategory: payload
      })
    }
  }

  @Action(getPictureByCategoryFail)
  getPictureByCategoryFail({setState}: StateContext<PictureStateModel>, {err}: getPictureByCategoryFail){
    console.log(err)
  }

  @Action(getBestsellers)
  getBestsellers(ctx: StateContext<PictureStateModel>){
    ctx.patchState({
      loaded: false,
      loading: true
    })
    this.categoriesService.getBestsellers$().subscribe(
      response => ctx.dispatch(new getBestsellersSuccess(response)),
      err => ctx.dispatch(new getBestsellersFail(err))
    )
  }

  @Action(getBestsellersSuccess)
  getBestsellersSuccess({patchState}: StateContext<PictureStateModel>, {payload}:getBestsellersSuccess){
    patchState({
      loaded: true,
      loading: false,
      bestsellers: payload
    })
  }

  @Action(getBestsellersFail)
  getBestsellersFail({setState}: StateContext<PictureStateModel>, {err}:getBestsellersFail){
    console.log(err)
  }

  @Action(getRankings)
  getRankings(ctx: StateContext<PictureStateModel>){
    ctx.patchState({
      loaded: false,
      loading: true
    })
    this.categoriesService.getRankings$().subscribe(
      response => ctx.dispatch(new getRankingsSuccess(response)),
      err => ctx.dispatch(new getRankingsFail(err))
    )
  }

  @Action(getRankingsSuccess)
  getRankingsSuccess({patchState}: StateContext<PictureStateModel>, {payload}:getRankingsSuccess){
    patchState({
      loaded: true,
      loading: false,
      rankings: payload
    })
  }

  @Action(getRankingsFail)
  getRankingsFail({setState}: StateContext<PictureStateModel>, {err}:getRankingsFail){
    console.log(err)
  }

  @Action(getPopular)
  getPopular(ctx: StateContext<PictureStateModel>){
    ctx.patchState({
      loaded: false,
      loading: true
    })
    this.categoriesService.getPopular$().subscribe(
      response => ctx.dispatch(new getPopularSuccess(response)),
      err => ctx.dispatch(new getPopularFail(err))
    )
  }

  @Action(getPopularSuccess)
  getPopularSuccess({patchState}: StateContext<PictureStateModel>, {payload}:getPopularSuccess){
    patchState({
      loaded: true,
      loading: false,
      popular: payload
    })
  }

  @Action(getPopularFail)
  getPopularFail({setState}: StateContext<PictureStateModel>, {err}:getPopularFail){
    console.log(err)
  }

  @Action(setFilterText)
  setFilterText(ctx: StateContext<PictureStateModel>, {text}: setFilterText){
    const state = ctx.getState().pictures.filter(el => el.title.toLowerCase().includes(text.toLowerCase()))
    ctx.patchState({
      currentPictures: [...state]
    })
  }

  @Action(filterByScore)
  filterByScore(ctx: StateContext<PictureStateModel>, {arr}: filterByScore){
    ctx.patchState({
      loading: true,
      loaded: false
    })
  }

}
