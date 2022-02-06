import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { BehaviorSubject, catchError, tap, throwError } from "rxjs";

import { environment } from "../../environments/environment";

import { ArticleModel, CreateOrUpdateArticleModel } from "./article.model";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private _articlesSubject = new BehaviorSubject([]);
  articles$ = this._articlesSubject.asObservable();

  private _tagsSubject = new BehaviorSubject([]);
  popularTags$ = this._tagsSubject.asObservable();

  constructor(private http: HttpClient) {}

  addArticle(article: CreateOrUpdateArticleModel) {
    const form = new FormData();

    Object.entries(article).forEach(([key, value]) => {
      form.append(key, value);
    });

    return this.http.post<ArticleModel>(`${environment.apiUrl}/articles`, form)
      .pipe(
        tap(article => {
            this._articlesSubject.next([ ...this._articlesSubject.value, article ]);
          }
        )
      );
  }

  getArticles(pageIndex, pageSize = 10) {
    return this.http.get<any>(`${environment.apiUrl}/articles?skip=${pageIndex}&limit=${pageSize}`)
      .pipe(
        tap(articles => {
            this._articlesSubject.next(articles.data);
          }
        )
      );
  }

  likeArticle(articleId: string) {
    return this.http.post<{ success: boolean }>(`${environment.apiUrl}/articles/${articleId}/like`, null)
      .pipe(
        tap(() => {
            this._articlesSubject.next(
              this._articlesSubject.value.map(article => {
                if(article._id === articleId) {
                  return {...article, liked: true, likes: article.likes + 1};
                }

                return article;
              })
            )
          }
        )
      )
  }

  dislikeArticle(articleId: string) {
    return this.http.post<{ success: boolean }>(`/api/articles/${articleId}/dislike`, null)
      .pipe(
        tap(() => {
            this._articlesSubject.next(
              this._articlesSubject.value.map(article => {
                if(article._id === articleId) {
                  return {...article, liked: false, likes: article.likes - 1};
                }

                return article;
              })
            )
          }
        )
      )
  }

  updateArticle(id: string, articleToUpdate: CreateOrUpdateArticleModel) {
    const form = new FormData();

    Object.entries(articleToUpdate).forEach(([key, value]) => {
      form.append(key, value);
    });

    return this.http.patch<ArticleModel>(`/api/articles/${id}`, form)
      .pipe(
        tap(articleToUpdate => {
          this._articlesSubject.next(
            this._articlesSubject.value.map(article => {
              if(article._id === id) {
                return articleToUpdate;
              }

              return article;
            })
          )

          if(articleToUpdate.tags.length > 0) {
            this.http.get<string[]>('api/tags/popular').subscribe(
              popularTags => this._tagsSubject.next(popularTags)
            )
          }
        }),
      );
  }

  deleteArticle(articleId) {
    this.http.delete<ArticleModel>(`/api/articles/${articleId}`)
      .pipe(
        tap(() => {
          this._articlesSubject.next(
            this._articlesSubject.value.filter(article => article._id !== articleId)
          )


          this.http.get<string[]>('api/tags/popular').subscribe(
            popularTags => this._tagsSubject.next(popularTags)
          )
        })
      )
      .subscribe();
  }

  getPopularTags() {
    return this.http.get<string[]>('api/tags/popular')
      .pipe(
        tap(tags => {
            this._tagsSubject.next(tags)
          }
        )
      )
  }
}
