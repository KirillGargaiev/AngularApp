import {Picture} from "./picture.model";


export interface Basket {
  name: string,
  surname: string,
  email: string,
  phone: string,
  address: string,
  city: string,
  state: string,
  postalCode: string,
  pictures: Picture[],
  price: number
}
