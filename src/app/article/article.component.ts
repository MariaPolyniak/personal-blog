import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { ArticlesService } from "./articles.service";
import { AuthService } from "../auth/auth.service";

import { UpdateArticleComponent } from "./update-article/update-article.component";
import { CommentSectionComponent } from "../comment/comment-section/comment-section.component";

import { ArticleModel } from "./article.model";

import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input() article: ArticleModel;

  dialogOptions = {
    closeOnNavigation: true,
    maxHeight: '80vh',
    maxWidth: '60vw',
    minHeight: '8vh',
    minWidth: '50vw',
    panelClass: 'custom-dialog-container'
  }

  avatarUrl;
  isAuthor;

  isReadMore = true;

  constructor(
    private http: HttpClient,
    private articlesService: ArticlesService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.avatarUrl = this.article.author.avatarId
        ? `/images/${this.article.author.avatarId}`
        : '../../../assets/avatar.png';

      this.isAuthor = user._id === this.article.author._id;
    });
  }

  get imageUrl(): string {
    return `/images/${this.article.pictureId}`;
  }

  toggleArticleContentLength(): void {
    this.isReadMore = !this.isReadMore;
  }

  toggleLike(): void {
    if(this.article.liked) {
      this.articlesService.dislikeArticle(this.article._id).subscribe();
    } else {
      this.articlesService.likeArticle(this.article._id).subscribe();
    }
  }

  onUpdateArticle(): void {
    this.dialog.open(UpdateArticleComponent, {
      data: this.article,
      ...this.dialogOptions
    });
  }

  onCommentArticle(): void {
    this.dialog.open(CommentSectionComponent, {
      data: this.article._id,
      ...this.dialogOptions
    });
  }

  onDeleteArticle(): void {
    this.articlesService.deleteArticle(this.article._id);

    this.article.pictureId && this.http.delete(`/images/${this.article.pictureId}`).subscribe();
  }
}
