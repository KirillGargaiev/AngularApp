import { Picture } from '../models/picture.model'

export class getAllPictures{
  static readonly type = '[Picture] Get All'

  constructor(public payload: Picture[]) {
  }
}


export class getPicture{
  static readonly type = '[Picture] Get One'

  constructor(public payload: number) {
  }
}

export class getPictureSuccess{
  static readonly type = '[Picture] Get One Success'

  constructor(public payload: Picture) {
  }
}

export class getPictureFail{
  static readonly type = '[Picture] Get One Fail'

  constructor(public err: any) {
  }
}

export class getPictureByCategory{
  static readonly type = '[Picture] Get by Category'

  constructor(public id: number) {
  }
}

export class getPictureByCategorySuccess{
  static readonly type = '[Picture] Get by Category Success'

  constructor(public payload: Picture[]) {
  }
}

export class getPictureByCategoryFail{
  static readonly type = '[Picture] Get by Category Fail'

  constructor(public err: any) {
  }
}

export class getBestsellers{
  static readonly type = '[Picture] Get Bestsellers'
}

export class getBestsellersSuccess{
  static readonly type = '[Picture]Get Bestsellers Success'

  constructor(public payload: Picture[]) {
  }
}

export class getBestsellersFail{
  static readonly type = '[Picture]Get Bestsellers Fail'

  constructor(public err: any) {
  }
}

export class getRankings{
  static readonly type = '[Picture] Get Rankings'

}

export class getRankingsSuccess{
  static readonly type = '[Picture]Get Rankings Success'

  constructor(public payload: Picture[]) {
  }
}

export class getRankingsFail{
  static readonly type = '[Picture]Get Rankings Fail'

  constructor(public err: any) {
  }
}

export class getPopular{
  static readonly type = '[Picture] Get Popular'

}

export class getPopularSuccess{
  static readonly type = '[Picture]Get Popular Success'

  constructor(public payload: Picture[]) {
  }
}

export class getPopularFail{
  static readonly type = '[Picture]Get Popular Fail'

  constructor(public err: any) {
  }
}

export class ChangePictureCountInCart {
  static readonly type = '[Picture] Change Picture Count In Cart';

  constructor(public data: Picture) {
  }
}

export class setFilterText {
  static readonly type = '[Picture] Set Filter Text';

  constructor(public text: string) {
  }
}

export class filterByScore {
  static readonly type = '[Picture] Set Filter by Score';

  constructor(public arr: Array<boolean>) {
  }
}




