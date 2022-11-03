import { Injectable} from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";

import { HttpClient} from "@angular/common/http";
import {Post} from "../store/models/post.model";

@Injectable({
  providedIn: 'root'
})

export class PostService {
  constructor(private http: HttpClient) {

  }

  getPosts(): Observable<Post[]>{
    return this.http.get<Post[]>('http://localhost:3001/posts')
      .pipe(
        catchError(err => {
          console.log(err)
          return throwError(err)
        })
      )
  }

  getById(id:number): Observable<Post>{
    return this.http.get<Post>(`http://localhost:3001/posts/${id}`)
  }
}
