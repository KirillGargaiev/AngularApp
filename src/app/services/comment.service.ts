import { Injectable} from '@angular/core';
import {catchError, filter, map, Observable, throwError} from "rxjs";

import { HttpClient} from "@angular/common/http";
import { Comment } from "../store/models/comment.model";

@Injectable({
  providedIn: 'root'
})

export class CommentService {
  constructor(private http: HttpClient) {
  }

  getComments(): Observable<Comment[]>{
    return this.http.get<Comment[]>('http://localhost:3001/comments')
      .pipe(
        catchError( err =>{
          console.log(err)
          return throwError(err)
        })
      )
  }

  getCommentsOfPost(id: number): Observable<Comment[]>{
    return this.http.get<Comment[]>('http://localhost:3001/comments')
      .pipe(
        map(comment => comment.filter(el => el.postId === +id))
      )
  }

  addComment(comment: Comment): Observable<Comment>{
    return this.http.post<Comment>(`http://localhost:3001/comments/`, {
      id: comment.id,
      postId: comment.postId,
      text: comment.text,
      name: comment.name,
      email: comment.email,
      fatherId: comment.fatherId || null
    })
  }
}
