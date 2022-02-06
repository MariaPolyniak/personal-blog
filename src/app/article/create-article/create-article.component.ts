import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ArticlesService } from "../articles.service";
import { CreateOrUpdateArticleModel } from "../article.model";

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent {
  formHeader = 'Create article';

  constructor(private router: Router, private articlesService: ArticlesService) {}

  onFormSubmit(article: CreateOrUpdateArticleModel) {
    this.articlesService.addArticle(article).subscribe(
      () => this.router.navigateByUrl('home')
    );
  }
}
