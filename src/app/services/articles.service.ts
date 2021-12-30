import { Injectable } from '@angular/core';
import { of } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { UserService } from "./user.service";
import { ArticleModel } from "../models/article.model";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  popularTags$ = of([]);
  headers = new HttpHeaders().set('User-ID', this.userService.getId());

  constructor(private http: HttpClient, private userService: UserService) {}

  addArticle(articleDetails: Partial<ArticleModel>) {
    return this.http.post<ArticleModel>('/api/articles', articleDetails, {
      headers: this.headers
    });
  }

  getArticles() {
    return this.http.get<ArticleModel[]>('/api/articles');
  }

  likeArticle(articleId: string) {
    return this.http.post<{ success: boolean }>(`/api/articles/${articleId}/like`, null, {
      headers: this.headers
    });
  }
}
