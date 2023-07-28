import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CommentInterface } from '../types/comment.interface';

@Injectable()
export class CommentsService {
  constructor(private http: HttpClient) {}

  getComments(): Observable<CommentInterface[]> {
    return this.http.get<CommentInterface[]>('http://localhost:3000/comments');
  }

  createComment(
    text: string,
    parentId: string | null = null
  ): Observable<CommentInterface> {
    return this.http.post<CommentInterface>('http://localhost:3000/comments', {
      body: text,
      parentId,
      // Should not be set here
      createdAt: new Date().toISOString(),
      userId: '1',
      username: 'John',
    });
  }

  updateComment(id: string, text: string): Observable<CommentInterface> {
    return this.http.patch<CommentInterface>(
      `http://localhost:3000/comments/${id}`,
      {
        body: text,
      }
    );
  }

  deleteComment(id: string): Observable<{}> {
    return this.http.delete(`http://localhost:3000/comments/${id}`);
  }
}
