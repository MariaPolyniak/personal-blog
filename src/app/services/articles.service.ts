import { Injectable } from '@angular/core';
import { BehaviorSubject, map, distinctUntilChanged } from "rxjs";
import { HttpClient } from '@angular/common/http'

import { ArticleModel } from "../models/article.model";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private articles = new BehaviorSubject([]);

  articles$ = this.articles.asObservable();

  popularTags$ = this.articles$.pipe(
    distinctUntilChanged((previous, next) => previous.length === next.length),
    map(articles => {
      if (!articles.length) {
        return [];
      }

      const allTags = articles.reduce((result, article) => [...result, ...article.tagList], []);
      const tagNameToCountMap = allTags.reduce((result, tagName) => ({
          ...result,
          [tagName]: result[tagName] ? result[tagName] + 1 : 1
      }), {});

      return Object.entries(tagNameToCountMap).sort(([,aCount], [, bCount]) => (bCount as number) - (aCount as number))
        .slice(0, 3)
        .map(([name]) => name);
    })
  );

  constructor(private http: HttpClient) {}

  getArticles() {
    return this.http.get<ArticleModel[]>('/api/posts');
  }

  addArticle(articleDetails: Omit<ArticleModel, 'id' | 'date' | 'likesAmount'>): void {
    const article: ArticleModel = {
      ...articleDetails,
      id: Date.now(),
      date: Date.now(),
      likesAmount: 0
    }

    this.articles.next([...this.articles.value, article]);
  }

  updateArticle(articleToUpdate: ArticleModel): void {
    this.articles.next(this.articles.value.map(article => {
      return article.id === articleToUpdate.id ? articleToUpdate : article;
    }));
  }

  deleteArticle(articleId: number): void {
    this.articles.next(this.articles.value.filter(article => article.id !== articleId));
  }

  addLike(articleId: number): void {
    this.articles.next(this.articles.value.map(article => {
      return article.id === articleId ? {...article, likesAmount: article.likesAmount + 1} : article;
    }));
  }
}
