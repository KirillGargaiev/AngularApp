import { Review } from '../models/review.model'


export class fetchReviews{
  static readonly type = '[Review] Fetch All'

  constructor(public payload: Review[]) {
  }
}


export class addReview{
  static readonly type = '[Review] Add'

  constructor(public form: Review) {
  }
}


export class AddReviewSuccess{
  static readonly type = '[Review] Add Success'

  constructor(public data: Review) {
  }

}


export class AddReviewFail{
  static readonly type = '[Review] Add Fail'

  constructor(public err: any) {
  }

}

export class removeReview{
  static readonly type = '[Review] Remove'

  constructor(public data: number) {
  }
}


export class RemoveReviewSuccess{
  static readonly type = '[Review] Remove Success'

  constructor(public id: number) {
  }
}

export class RemoveReviewFail{
  static readonly type = '[Review] Remove Fail'

  constructor(public err: any) {
  }
}

export class getReviews{
  static readonly type = '[Review] Get Reviews'

  constructor(public id: number) {
  }
}


