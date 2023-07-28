import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';

import { TodoInterface } from '../types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) {}

  getTodos(): Observable<TodoInterface[]> {
    const url = `${environment.apiUrl}/posts`;

    return this.http.get<TodoInterface[]>(url).pipe(
      retry(1),
      catchError(this.handleError),
      map((todos) => todos.reverse())
    );
  }

  createTodo(todo: TodoInterface): Observable<TodoInterface> {
    const url = `${environment.apiUrl}/posts`;
    
    return this.http.post<TodoInterface>(url, todo);
  }

  completeTodo(id: number, todo: TodoInterface): Observable<TodoInterface> {
    const url = `${environment.apiUrl}/posts/${id}`;

    return this.http.put<TodoInterface>(url, todo);
  }

  updateTodo(id: number, todo: TodoInterface): Observable<TodoInterface> {
    const url = `${environment.apiUrl}/posts/${id}`;

    return this.http.put<TodoInterface>(url, todo);
  }

  removeTodo(id: number): Observable<{}> {
    const url = `${environment.apiUrl}/posts/${id}`;

    return this.http.delete<TodoInterface[]>(url);
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => {
      return errorMessage;
    });
  }
}
