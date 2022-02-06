import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import { CommentService } from "../comment.service";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'app-comment-editor',
  templateUrl: './comment-editor.component.html',
  styleUrls: ['./comment-editor.component.scss']
})
export class CommentEditorComponent {
  @Input() articleId;
  @ViewChild('InputEl', { static: true }) inputEl: ElementRef;

  inputValue = '';
  user$ = this.authService.user$;

  constructor(private commentService: CommentService, private authService: AuthService) {}

  getAvatarUrl(id: string): string {
    return `/images/${id}`;
  }

  onAddComment(userId: string): void {
    const content = this.inputEl.nativeElement.value;

    this.commentService.addComment({ author: userId, article: this.articleId, content }).subscribe();

    this.inputEl.nativeElement.value = '';
  }
}
