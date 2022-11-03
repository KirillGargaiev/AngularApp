import {State, Action, StateContext, Selector, NgxsOnInit} from '@ngxs/store';
import {Injectable} from "@angular/core";

import { Comment } from "../models/comment.model";
import {CommentService} from "../../services/comment.service";
import {
  addComment, addCommentFail,
  addCommentSuccess,
  fetchComments,
  getComments,
  getCommentsFail,
  getCommentsSuccess
} from "../actions/comment.action";


export class CommentStateModel {
  comments!: Comment[]
  loading!: boolean
  loaded!: boolean
  currentComments!: Comment[]
}

@State<CommentStateModel>({
  name: 'comments',
  defaults: {
    comments: [],
    loading: false,
    loaded: false,
    currentComments: []
  }
})

@Injectable()

export class CommentState implements NgxsOnInit{

  constructor(private commentService: CommentService) {
  }

  ngxsOnInit(ctx: StateContext<any>): void {
    ctx.patchState({
      loading: true,
      loaded: false
    })
    this.commentService.getComments().subscribe(
      response => ctx.dispatch(new fetchComments(response))
    )
  }

  @Selector()
  static getComments(state: CommentStateModel){
    return state.currentComments
  }

  @Selector()
  static getRootComments(state: CommentStateModel){
    return state.currentComments.filter(el => el.fatherId === null)
  }

  @Action(fetchComments)
  fetchComments(ctx: StateContext<CommentStateModel>, {payload}: fetchComments){
    ctx.patchState({
      loaded: true,
      loading: false,
      comments: payload
    })
  }

  @Action(getComments)
  getComments(ctx: StateContext<CommentStateModel>, {id}: getComments){
    ctx.patchState({
      loading: true,
      loaded: false
    })
    this.commentService.getCommentsOfPost(id).subscribe(
      response => ctx.dispatch(new getCommentsSuccess(response)),
      err => ctx.dispatch(new getCommentsFail(err))
    )
  }

  @Action(getCommentsSuccess)
  getCommentsSuccess(ctx: StateContext<CommentStateModel>, {payload}: getCommentsSuccess){
    ctx.patchState({
      loading: false,
      loaded: true,
      currentComments: payload
    })
  }

  @Action(getCommentsFail)
  getCommentsFail(ctx: StateContext<CommentStateModel>, {err}: getCommentsFail){
    ctx.patchState({
      loading: false,
      loaded: true,
    })
    console.log(err)
  }

  @Action(addComment)
  addComment(ctx: StateContext<CommentStateModel>, {payload}: addComment){
    ctx.patchState({
      loading: true,
      loaded: false
    })
    this.commentService.addComment(payload).subscribe(
      response => ctx.dispatch(new addCommentSuccess(response)),
      err => ctx.dispatch(new addCommentFail(err))
    )
  }

  @Action(addCommentSuccess)
  addCommentSuccess(ctx: StateContext<CommentStateModel>, {payload}: addCommentSuccess){
    const state = ctx.getState()
    ctx.patchState({
      loaded: true,
      loading: false,
      comments: [...state.comments, payload],
      currentComments: [...state.currentComments, payload]
    })
  }

  @Action(addCommentFail)
  addCommentFail(ctx: StateContext<CommentStateModel>, {err}: addCommentFail){
    ctx.patchState({
      loaded: true,
      loading: false,
    })
    console.log(err)
  }

}
