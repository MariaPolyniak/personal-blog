import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { SharedModule } from "../shared/shared.module";

import { CommentEditorComponent } from './comment-editor/comment-editor.component';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { CommentSectionComponent } from './comment-section/comment-section.component';

@NgModule({
  declarations: [
    CommentEditorComponent,
    CommentsListComponent,
    CommentSectionComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CommentEditorComponent,
    CommentsListComponent,
    CommentSectionComponent
  ]
})
export class CommentModule {}
