import { Component } from '@angular/core';
import { ArticlesService } from "../../services/articles.service";

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
})
export class ArticlesListComponent {
  articles$ = this.articlesService.getArticles();

  constructor(private articlesService: ArticlesService) {}

  onAddLike(articleId) {
    this.articlesService.addLike(articleId);
  }
}
