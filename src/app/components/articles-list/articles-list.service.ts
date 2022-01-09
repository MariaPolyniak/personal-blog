import { Injectable } from "@angular/core";
import { Subject, merge } from "rxjs";

import { ArticlesService } from "../../services/articles.service";
import { ArticleModel } from "../../models/article.model";

@Injectable()
export class ArticlesListService {
  private updatedArticles = new Subject<ArticleModel[]>();

  readonly articles$ = merge(this.updatedArticles, this.articlesService.getArticles());

  constructor(private articlesService: ArticlesService) {}

  likeArticle(articles: ArticleModel[], articleId: string): void {
    this.articlesService.likeArticle(articleId).subscribe(() => {
      this.updatedArticles.next(articles.map(article => article._id === articleId
          ? ({ ...article, likes: article.likes + 1 })
          : article
      ))
    });
  }
}
