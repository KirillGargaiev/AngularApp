import {Comment} from "../models/comment.model";

export class fetchComments {
  static readonly type = '[Comment] Fetch All Comments'

  constructor(public payload: Comment[]) {
  }
}

export class getComments {
  static readonly type = '[Comment] Get Comments'

  constructor(public id: number) {
  }
}

export class getCommentsSuccess {
  static readonly type = '[Comment] Get Comments Success'

  constructor(public payload: Comment[]) {
  }
}

export class getCommentsFail {
  static readonly type = '[Comment] Get Comments Fail'

  constructor(public err: any) {
  }
}

export class addComment {
  static readonly type = '[Comment] Add Comment'

  constructor(public payload: Comment) {
  }
}

export class addCommentSuccess {
  static readonly type = '[Comment] Add Comment Success'

  constructor(public payload: Comment) {
  }
}

export class addCommentFail {
  static readonly type = '[Comment] Add Comment Fail'

  constructor(public err: any) {
  }
}
