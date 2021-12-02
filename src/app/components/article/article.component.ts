import { Component, Input } from '@angular/core';
import { ArticlesService } from "../../services/articles.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
  @Input() article;

  isReadMore = true;

  constructor(private articlesService: ArticlesService) {}

  toggleArticleContentLength() {
    this.isReadMore = !this.isReadMore;
  }

  increaseLikesAmount() {
    this.articlesService.updateArticle({
      ...this.article,
      likesAmount: this.article.likesAmount + 1
    })
  }
}
