import { Component } from '@angular/core';

import { ArticlesListService } from "./articles-list.service";
import { ArticleModel } from "../../models/article.model";

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
  providers: [ArticlesListService]
})
export class ArticlesListComponent {
  readonly articles$ = this.articlesListService.articles$;

  constructor(private articlesListService: ArticlesListService) {}

  onAddLike(articles: ArticleModel[], articleId: string): void {
    this.articlesListService.likeArticle(articles, articleId);
  }
}
