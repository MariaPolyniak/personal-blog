import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ArticleModel } from "../../models/article.model";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
  @Input() article: ArticleModel;
  @Output() addLike = new EventEmitter<string>();

  isReadMore = true;

  toggleArticleContentLength() {
    this.isReadMore = !this.isReadMore;
  }

  onAddLike() {
    this.addLike.emit(this.article._id);
  }
}
