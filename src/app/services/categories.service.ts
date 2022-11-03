import { Injectable} from '@angular/core';
import {catchError, map, Observable, of, throwError} from "rxjs";

import { HttpClient} from "@angular/common/http";
import {Picture} from "../store/models/picture.model";
import {Category} from "../store/models/category.model";


@Injectable({
  providedIn: 'root'
})
export class CategoriesService{


  constructor(private http: HttpClient) {
  }

  getCategories$(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3001/categories')
      .pipe(
        catchError(err => {
          console.log(err.message)
          return throwError(err)
        })
      )
  }


  getBestsellers$(): Observable<Picture[]>  {
    return this.http.get<Picture[]>('http://localhost:3001/pictures')
      .pipe(
        map(pictures => pictures.filter(el => el.bestsel)),
        catchError(err => {
          console.log(err.message)
          return throwError(err)
        })
      )
  }

  getRankings$(): Observable<Picture[]> {
    return this.http.get<Picture[]>('http://localhost:3001/pictures')
      .pipe(
        map(pictures => pictures.filter(el => el.ranking)),
        catchError(err => {
          console.log(err.message)
          return throwError(err)
        })
      )
  }

  getPopular$(): Observable<Picture[]> {
    return this.http.get<Picture[]>('http://localhost:3001/pictures')
      .pipe(
        map(pictures => pictures.filter(el => el.popular)),
        catchError(err => {
          console.log(err.message)
          return throwError(err)
        })
      )
  }

  getById(id: number){
    return this.http.get<Picture>(`http://localhost:3001/pictures/${id}`)
  }

  getPictures(){
    return this.http.get<Picture[]>('http://localhost:3001/pictures')
      .pipe(
        catchError(err => {
          console.log(err.message)
          return throwError(err)
        })
      )
  }

  getProductsByCategories$(id: number){
    return this.http.get<Picture[]>('http://localhost:3001/pictures?categoryId=' + id)
      .pipe(
        catchError(err => {
          console.log(err.message);
          return throwError(err)
        })
      )
  }
}
