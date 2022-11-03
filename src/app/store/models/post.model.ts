import {Category} from "./category.model";

export interface Post{
  id: number,
  category: Category,
  featured?: boolean,
  date: string,
  author: string,
  text: string,
  img: string,
}
