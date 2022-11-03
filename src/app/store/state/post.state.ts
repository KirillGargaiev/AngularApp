import {State, Action, StateContext, Selector, NgxsOnInit} from '@ngxs/store';
import {Injectable} from "@angular/core";
import {PostService} from "../../services/post.service";
import {Post} from "../models/post.model";
import {fetchPosts, getPostById, getPostByIdFail, getPostByIdSuccess} from "../actions/post.action";

export class PostStateModel {
  posts!: Post[]
  loading!: boolean
  loaded!: boolean
  byId: Post | undefined
}

@State<PostStateModel>({
  name: 'posts',
  defaults: {
    posts: [],
    loading: false,
    loaded: false,
    byId: undefined
  }


})

@Injectable()

export class PostState implements NgxsOnInit {

  constructor(private postService: PostService) {
  }

  ngxsOnInit(ctx: StateContext<any>): void {
    ctx.patchState({
      loading: true,
      loaded: false
    })
    this.postService.getPosts().subscribe(
      response => ctx.dispatch(new fetchPosts(response))
    )
  }

  @Selector()
  static getPosts(state: PostStateModel){
    return state.posts
  }

  @Selector()
  static getFeatured(state: PostStateModel){
    return state.posts.filter(el => el.featured)
  }

  @Selector()
  static getPostById(state: PostStateModel){
    return state.byId
  }

  @Action(fetchPosts)
  fetchPosts(ctx: StateContext<PostStateModel>, {payload}: fetchPosts){
    ctx.patchState({
      loaded: true,
      loading: false,
      posts: payload
    })
  }

  @Action(getPostById)
  getPostById(ctx: StateContext<PostStateModel>, {id}: getPostById){
    ctx.patchState({
      loading: true,
      loaded: false
    })
    this.postService.getById(id).subscribe(
      response => ctx.dispatch(new getPostByIdSuccess(response)),
            err => ctx.dispatch(new getPostByIdFail(err))
    )
  }

  @Action(getPostByIdSuccess)
  getPostByIdSuccess(ctx: StateContext<PostStateModel>, {payload}: getPostByIdSuccess){
    ctx.patchState({
      loaded: true,
      loading: false,
      byId: payload
    })
  }

  @Action(getPostByIdFail)
  getPostByIdFail(ctx: StateContext<PostStateModel>, {err}: getPostByIdFail){
    ctx.patchState({
      loaded: true,
      loading: false
    })
    console.log(err)
  }
}
