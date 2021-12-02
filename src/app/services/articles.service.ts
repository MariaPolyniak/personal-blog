import { Injectable } from '@angular/core';
import { BehaviorSubject, map, distinctUntilChanged } from "rxjs";
import { Article } from "../models/article.model";
import { ARTICLES } from '../models/articles.model';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private articles = new BehaviorSubject(ARTICLES);

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

  addArticle(newArticle: Article): void {
    const id = Date.now();

    this.articles.next([...this.articles.value, {
      ...newArticle,
      id
    }]);
  }

  updateArticle(articleToUpdate: Article): void {
    this.articles.next(this.articles.value.map(article => {
      return article.id === articleToUpdate.id ? articleToUpdate : article;
    }));
  }

  deleteArticle(articleId: number): void {
    this.articles.next(this.articles.value.filter(article => article.id !== articleId));
  }
}
