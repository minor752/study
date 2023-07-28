import { NgModule } from '@angular/core';
import { CommentsComponent } from './components/comments/comments.component';
import { CommonModule } from '@angular/common';
import { CommentsService } from './services/comments.service';
import { CommentComponent } from './components/comment/comment.component';
import { CommentFormComponent } from './components/commentForm/commentForm.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [CommentsComponent, CommentComponent, CommentFormComponent],
  exports: [CommentsComponent],
  providers: [CommentsService],
})
export class CommentsModule {}
