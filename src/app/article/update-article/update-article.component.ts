import { Component, Inject } from '@angular/core';
import { Router } from "@angular/router";

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ArticleFormComponent } from "../article-form/article-form.component";
import { ArticlesService } from "../articles.service";
import { ArticleModel, CreateOrUpdateArticleModel } from "../article.model";

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.scss']
})
export class UpdateArticleComponent {
  formHeader = 'Update Article'

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: Partial<ArticleModel>,
    public dialogRef: MatDialogRef<ArticleFormComponent>,
    private articlesService: ArticlesService,
  ) {}

  onFormSubmit(article: CreateOrUpdateArticleModel) {
    this.articlesService.updateArticle(this.data._id, article)
      .subscribe(() => {
        this.dialogRef.close();
        this.router.navigateByUrl('home');
    });
  }
}

