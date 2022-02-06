import { Component, Input, OnInit } from '@angular/core';

import { CommentService } from "../comment.service";

import { Comment } from "../comment.model";

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {
  @Input() articleId;

  readonly comments$ = this.commentService.comments$;

  constructor(private commentService: CommentService) {}

  ngOnInit() {
    this.commentService.getComments(this.articleId).subscribe();
  }

  public getCommentAuthor(comment: Comment) {
    return `${comment.author.firstName} ${comment.author.lastName}`;
  }

  onCommentDelete(commentId: string) {
    this.commentService.deleteComment(commentId).subscribe();
  }
}
