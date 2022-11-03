import { Category } from '../models/category.model'

export class addCategory{
  static readonly type = '[Category] Add'

  constructor(public payload: Category) {
  }
}

export class removeCategory{
  static readonly type = '[Category] Remove'

  constructor(public payload: number) {
  }
}

export class fetchCategory{
  static readonly type = '[Category] Fetch Success'

  constructor(public payload: Category[]) {
  }
}

export class fetchCategoryFail{
  static readonly type = '[Category] Fetch Error'

  constructor(public err: any) {
  }
}

