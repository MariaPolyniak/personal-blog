import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { SharedModule } from "../shared/shared.module";

import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleComponent } from './article.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { UpdateArticleComponent } from './update-article/update-article.component';
import { ArticleFormComponent } from './article-form/article-form.component';

import { ArticlesService } from "./articles.service";

@NgModule({
  declarations: [
    ArticlesListComponent,
    ArticleComponent,
    CreateArticleComponent,
    UpdateArticleComponent,
    ArticleFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ArticlesListComponent,
    ArticleComponent,
    CreateArticleComponent,
    UpdateArticleComponent,
    ArticleFormComponent
  ],
  providers: [ ArticlesService ]
})
export class ArticleModule {}
