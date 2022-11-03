import {State, Action, StateContext, Selector, NgxsOnInit} from '@ngxs/store';
import {Review} from '../models/review.model'
import {
  addReview,
  AddReviewSuccess,
  AddReviewFail,
  removeReview,
  RemoveReviewSuccess,
  RemoveReviewFail, fetchReviews, getReviews
} from '../actions/review.actions'
import {Injectable} from "@angular/core";
import {ReviewService} from "../../services/review.service";


export class ReviewStateModel {
  reviews!: Review[]
  id!: number
  loading!: boolean
  loaded!: boolean
}

@State<ReviewStateModel>({
  name: 'reviews',
  defaults: {
    reviews: [],
    id: 0,
    loading: false,
    loaded: false
  }
})

@Injectable()

export class ReviewState implements NgxsOnInit {

  constructor(private reviewService: ReviewService) {
  }

  ngxsOnInit(ctx: StateContext<any>): void {
    ctx.patchState({
      loading: true,
      loaded: false
    })
    this.reviewService.getReviews().subscribe(
      response => ctx.dispatch(new fetchReviews(response))
    )
  }


  @Selector()
  static getReviews(state: ReviewStateModel) {
    return state.reviews
  }

  @Selector()
  static getCurrentReviews(state: ReviewStateModel) {
    return state.reviews.filter(el => el.productId === +state.id)
  }

  @Action(fetchReviews)
  fetch(ctx: StateContext<ReviewStateModel>, {payload}: fetchReviews) {
    ctx.patchState({
      reviews: payload,
      loaded: true,
      loading: false
    })
  }

  @Action(addReview)
  add(ctx: StateContext<ReviewStateModel>, {form}: addReview) {
    ctx.patchState({
      loading: true,
      loaded: false
    })
    this.reviewService.addToReviews$(form).subscribe(
      response => ctx.dispatch(new AddReviewSuccess(response)),
      err => ctx.dispatch(new AddReviewFail(err))
    )
  }

  @Action(getReviews)
  getReviews(ctx: StateContext<ReviewStateModel>, {id}: getReviews) {
    ctx.patchState({
      loading: false,
      loaded: true,
      id: id
    })
  }


  @Action(AddReviewSuccess)
  addReviewSuccess({patchState, getState, setState}: StateContext<ReviewStateModel>, {data}: AddReviewSuccess) {
    const state = getState().reviews
    patchState({
      loaded: true,
      loading: false,
      reviews: [...state, data]
    })
  }

  @Action(AddReviewFail)
  addReviewFail({patchState, getState, setState}: StateContext<ReviewStateModel>, {err}: AddReviewFail) {
    console.log(err)
  }

  @Action(removeReview)
  remove(ctx: StateContext<ReviewStateModel>, {data}: removeReview) {
    ctx.patchState({
      loading: true,
      loaded: false,
    })
    this.reviewService.deleteReviews$(data).subscribe(
      response => ctx.dispatch(new RemoveReviewSuccess(data)),
      err => ctx.dispatch(new RemoveReviewFail(err)),
    )
  }

  @Action(RemoveReviewSuccess)
  removeReviewSuccess({patchState, getState, setState}: StateContext<ReviewStateModel>, {id}: RemoveReviewSuccess) {
    const state = getState().reviews.filter(el => el.id !== id)
    setState({
      reviews: [...state],
      id: getState().id,
      loaded: true,
      loading: false,
    })
  }

  @Action(RemoveReviewFail)
  removeReviewFail({patchState, getState, setState}: StateContext<ReviewStateModel>, {err}: RemoveReviewFail) {
    console.log(err)
  }




}
