import { Injectable } from '@angular/core';
import {catchError, filter, map, Observable, take, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Review} from "../store/models/review.model";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }


  getReviews(): Observable<Review[]>{
    return this.http.get<Review[]>('http://localhost:3001/reviews/')
  }

  getReviewsById(id: number): Observable<Review[]>{
    return this.http.get<Review[]>('http://localhost:3001/reviews/')
      .pipe(
        map(product => product.filter(el => el.productId === id))
      )
  }

  addToReviews$(example: Review): Observable<Review> {
    return this.http.post<Review>(`http://localhost:3001/reviews/`, {
      id: example.id,
      name: example.name,
      email: example.email,
      score: example.score,
      comment: example.comment,
      productId: +example.productId
    })
  }

  deleteReviews$(id: number): Observable<Review> {
    const url = `http://localhost:3001/reviews/${id}`
    return this.http.delete<Review>(url).pipe(
      catchError(err => {
        console.log(err.message)
        return throwError(err)
      })
    )
  }
}
