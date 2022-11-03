import {Post} from "../models/post.model";

export class fetchPosts {
  static readonly type = '[Post] Get All'

  constructor(public payload: Post[]) {
  }
}

export class getPostById {
  static readonly type = '[Post] Get Post By Id'

  constructor(public id: number) {
  }
}

export class getPostByIdSuccess {
  static readonly type = '[Post] Get Post By Id Success'

  constructor(public payload: Post) {
  }
}

export class getPostByIdFail {
  static readonly type = '[Post] Get Post By Id Fail'

  constructor(public err: any) {
  }
}
