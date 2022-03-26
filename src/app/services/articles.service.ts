import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from "rxjs";

import { environment } from "../../environments/environment";
import { ArticleModel } from "../models/article.model";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  popularTags$ = of([]);

  constructor(private http: HttpClient) {}

  addArticle(articleDetails: Partial<ArticleModel>) {
    return this.http.post<ArticleModel>(`${environment.apiUrl}/articles`, articleDetails);
  }

  getArticles() {
    return this.http.get<ArticleModel[]>(`${environment.apiUrl}/articles`);
  }

  likeArticle(articleId: string) {
    return this.http.post<{ success: boolean }>(`${environment.apiUrl}/articles/${articleId}/like`, null);
  }
}
