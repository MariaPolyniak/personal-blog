import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent {
  articleId;

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {
    this.articleId = data;
  }
}
