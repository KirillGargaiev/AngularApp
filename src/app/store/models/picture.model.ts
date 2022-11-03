import {Review} from "./review.model";

export interface Picture {
  id: number,
  img: string,
  title: string,
  author: string,
  year: number,
  price: number,
  bestsel?: boolean,
  ranking?: boolean,
  popular?: boolean,
  inBasket: boolean,
  reviews: Review[],
  amount?: number,
  generalScore?: number
}
