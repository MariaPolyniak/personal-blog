import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject, tap } from "rxjs";

import { formatDistance } from "date-fns";

import { environment } from "../../environments/environment";

import { AddComment, GetComment } from "./comment.model";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private _commentSubject = new BehaviorSubject([]);
  comments$ = this._commentSubject.asObservable();

  constructor(private http: HttpClient) {}

  addComment(comment) {
    return this.http.post<AddComment>(`${environment.apiUrl}/comments`, comment)
      .pipe(
        tap(comment => {
          this._commentSubject.next([...this._commentSubject.value, comment])
        })
      );
  }

  getComments(articleId) {
    return this.http.get<GetComment[]>(`${environment.apiUrl}/comments?article-id=${articleId}`)
      .pipe(
        tap(comments => {
          this._commentSubject.next(comments.map(comment => ({
            ...comment,
            displayTime: formatDistance(new Date(), new Date(comment.date))
          })))
        })
      );
  }

  deleteComment(commentId: string) {
    return this.http.delete<{ success: boolean }>(`${environment.apiUrl}/comments/${commentId}`)
      .pipe(
        tap(() => {
          this._commentSubject.next(
            this._commentSubject.value.filter(comment => comment._id !== commentId)
          )
        })
      )
  }
}
